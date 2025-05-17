import { CommonModule } from '@angular/common';
import { Component, afterNextRender, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { Course } from '../models/course.model';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courses = signal<Course[] | []>([]);

  coursesService = inject(CoursesServiceWithFetch);

  constructor() {
    afterNextRender(() => {
      this.loadCourses();
    });
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.getAllCourses();
      this.courses.set(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  }
}
