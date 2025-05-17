import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
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
export class HomeComponent implements OnInit {
  courses = signal<Course[] | []>([]);

  coursesService = inject(CoursesServiceWithFetch);

  ngOnInit(): void {
    // this.loadCourses();
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
