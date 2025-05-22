import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { Course } from '../models/course.model';

@Component({
  selector: 'courses-card-list',
  imports: [CommonModule],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>();
  outputedCourse = output<Course>();
  deletedCourse = output<string>();

  dialog = inject(MatDialog);

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'update',
      title: 'Update existing course',
      course,
    });

    if (!newCourse) {
      return;
    }

    this.outputedCourse.emit(newCourse);
  }

  async onCourseDeleted(course: Course) {
    this.deletedCourse.emit(course.id);
  }
}
