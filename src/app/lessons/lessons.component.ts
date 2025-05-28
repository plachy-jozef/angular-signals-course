import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';

@Component({
  selector: 'lessons',
  imports: [],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
  mode = signal<'master' | 'detail'>('master');

  lessons = signal<Lesson[]>([]);

  selectedLesson = signal<Lesson | null>(null);

  lessonsService: LessonsService = inject(LessonsService);
  searchInput = viewChild.required<ElementRef>('search');

  // old kind
  onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    console.log('Search triggered', query);
  }
}
