import { Component, input, model } from '@angular/core';
import { CourseCategory } from '../models/course-category.model';

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss',
})
export class CourseCategoryComboboxComponent {
  label = input.required<string>();
  value = model.required<CourseCategory | null>();

  constructor() {
    this.value.set(null);
  }
  onCategoryChange(category: string): void {
    if (category) {
      this.value.set(category as CourseCategory);
    } else {
      this.value.set(null);
    }
  }
}
