import { CommonModule } from '@angular/common';
import { Component, Signal, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    CommonModule,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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
      console.error("Error loading courses:", error);
    }
  }
}
