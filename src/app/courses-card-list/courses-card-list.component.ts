import { NgIf } from '@angular/common';
import { Component, input, Signal } from '@angular/core';
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
  readonly courses: Signal<Course[] | []> = input.required<Course[] | []>();
}
