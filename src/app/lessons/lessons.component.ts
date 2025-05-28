import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@Component({
  selector: 'lessons',
  imports: [LessonDetailComponent],
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
  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    console.log('Search triggered', query);
    const results = await this.lessonsService.loadLessons({ query });
    this.lessons.set(results);
  }

  onLessonSelected(lesson: Lesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }

  onCancel() {
    this.mode.set('master');
    this.selectedLesson.set(null);
  }

  onLessonUpdated(lesson: Lesson) {
    this.lessons.update((lessons: Lesson[]) => lessons.map(l => (lesson.id === l.id ? lesson : l)));
  }
}
