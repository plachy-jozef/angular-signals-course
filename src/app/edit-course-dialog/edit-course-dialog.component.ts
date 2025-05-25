import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import { MessagesService } from '../messages/messages.service';
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
    CourseCategoryComboboxComponent,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent {
  dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: [''],
  });

  apiService = inject(CoursesService);
  messageService = inject(MessagesService);

  category = signal<CourseCategory>('BEGINNER');

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      iconUrl: this.data?.course?.iconUrl,
    });

    this.category.set(this.data?.course?.category ?? 'BEGINNER');

    effect(() => {
      console.log(`Course category bi-directional binding: ${this.category()}`);
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
      await this.updateCourse(this.data?.course!.id, coursePartial);
    } else {
      await this.createCourse(coursePartial);
    }
  }

  async updateCourse(courseId: string, course: Partial<Course>) {
    try {
      const updatedCourse = await this.apiService.putCourse(courseId, course);
      this.dialogRef.close(updatedCourse);
    } catch (error) {
      this.messageService.showMessage('Error saving course', 'error');
      console.error('Error saving course:', error);
    }
  }

  async createCourse(newCourse: Partial<Course>) {
    try {
      const courseId = await this.apiService.postCourse(newCourse);
      newCourse.id = courseId.id;
      this.dialogRef.close(newCourse);
    } catch (error) {
      this.messageService.showMessage('Error creating course', 'error');
      console.error('Error creating course:', error);
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

  const close$ = dialog
    .open(EditCourseDialogComponent, dialogConfig)
    .afterClosed();

  return await firstValueFrom(close$);
}
