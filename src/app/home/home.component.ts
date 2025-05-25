import { CommonModule } from '@angular/common';
import {
  Component,
  Signal,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MessagesService } from '../messages/messages.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CommonModule, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly #courses = signal<Course[] | []>([]);

  readonly coursesService = inject(CoursesService);

  readonly beginnerCourses: Signal<Course[] | []> = computed(() => {
    return this.#courses().filter((course: Course) => course.category === 'BEGINNER') || [];
  });

  readonly advancedCourses: Signal<Course[] | []> = computed(() => {
    return this.#courses().filter((course: Course) => course.category === 'ADVANCED') || [];
  });

  messageService = inject(MessagesService);

  dialog = inject(MatDialog);

  constructor() {
    afterNextRender(() => {
      this.loadCourses();
    });

    effect(() => {
      console.log('Beginner course:', this.beginnerCourses());
      console.log('Advanced course:', this.advancedCourses());
    });
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.getAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (error) {
      this.messageService.showMessage('Error loading courses', 'error');
      console.error('Error loading courses:', error);
    }
  }

  onOutputedCourse(updatedCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map((course: Course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );

    console.log('newCourses:', newCourses);
    this.#courses.update(() => newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter((course: Course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      this.messageService.showMessage('Error deleting course', 'error');
      console.error('error', error);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'Create New Course',
    });

    if (!newCourse) {
      return;
    }

    const newCourses: Course[] = [...this.#courses(), newCourse];
    this.#courses.set(newCourses);
  }
}
