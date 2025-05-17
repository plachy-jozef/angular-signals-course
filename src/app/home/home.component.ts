import { Component, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courses = signal<Course[]>([]);

  coursesService = inject(CoursesService);
}
