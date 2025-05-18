import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { firstValueFrom } from 'rxjs';
import { CourseCategoryComboboxComponent } from "../course-category-combobox/course-category-combobox.component";
import { LoadingIndicatorComponent } from "../loading/loading.component";
import { EditCourseDialogData } from './edit-course-dialog.data.model';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);

  onClose() {
    // Close the dialog
    this.dialogRef.close();
  }

  onSave() {
    // Save the course
    // this.dialog.close(this.courseForm.value);
    this.dialogRef.close(this.dialogRef.componentInstance.courseForm.value);
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

  return firstValueFrom(close$);
}
