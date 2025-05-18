import { NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { Course } from '../models/course.model';

@Component({
  selector: 'courses-card-list',
  imports: [
    NgIf
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>();

  dialog = inject(MatDialog);

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: 'update',
        title: 'Update existing course',
        course
      }
    )
  }

}
