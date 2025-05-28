import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../../messages/messages.service';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'lesson-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();

  lessonsService = inject(LessonsService);
  messagesService = inject(MessagesService);

  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  async onSave(description: string) {
    try {
      const lesson = this.lesson();

      const lessonUpdated = await this.lessonsService.saveLesson(lesson!.id, { description });
      this.lessonUpdated.emit(lessonUpdated);
      this.onCancel();
    } catch (error) {
      console.error('Error saving lesson:', error);
      this.messagesService.showMessage('Error saving lesson', 'error');
    }
  }
}
