import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { firstValueFrom } from 'rxjs';
import { LoadingIndicatorComponent } from "../loading/loading.component";
import { LoadingService } from '../loading/loading.service';
import { CourseCategory } from '../models/course-category.model';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { EditCourseDialogData } from './edit-course-dialog.data.model';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: ['']
  })

  apiService = inject(CoursesService);
  loadingService = inject(LoadingService);

  category = signal<CourseCategory>('BEGINNER');

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      category: this.data?.course?.category,
      iconUrl: this.data?.course?.iconUrl
    })

    this.category.set(this.data?.course?.category ?? 'BEGINNER');

    effect(() => {
      console.log(`Course category bi-directional binding: ${ this.category() }`);
    });
  }

  onClose() {
    // Close the dialog
    this.dialogRef.close();
  }

  async onSave() {
    const coursePartial: Partial<Course> = this.form.value as Partial<Course>;

    coursePartial.category = this.category();
    if (this.data.mode === 'update') {
      await this.saveCourse(this.data?.course!.id, coursePartial);
    } else {
      await this.createCourse(coursePartial);
    }
  }

  async saveCourse(courseId: string, course: Partial<Course>) {
    try {
      this.loadingService.loadingOn();
      const updatedCourse = await this.apiService.putCourse(courseId, course);
      this.dialogRef.close(updatedCourse);
    }
    catch (error) {
      console.error("Error saving course:", error);
      alert('Course failed to save');
    }
    finally {
      this.loadingService.loadingOff();
    }
  }

  async createCourse(newCourse: Partial<Course>) {
    try {
      this.loadingService.loadingOn();
      const courseId = await this.apiService.postCourse(newCourse);
      newCourse.id = courseId.id;
      this.dialogRef.close(newCourse);
    }
    catch (error) {
      console.error("Error creating course:", error);
      alert('Course failed to create');
    }
    finally {
      this.loadingService.loadingOff();
    }
  }
}



export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData
) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '400px';
  dialogConfig.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, dialogConfig)
    .afterClosed();

  return await firstValueFrom(close$);
}
