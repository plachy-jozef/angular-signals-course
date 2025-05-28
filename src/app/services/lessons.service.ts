import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  env = environment;

  http: HttpClient = inject(HttpClient);

  async loadLessons(config: { courseId?: string; query?: string }): Promise<Lesson[]> {
    const { courseId, query } = config;
    let params = new HttpParams();

    if (courseId) {
      params = params.set('courseId', courseId);
    }

    if (query) {
      params = params.set('query', query);
    }

    const lessons$ = this.http.get<GetLessonsResponse>(`${this.env.apiRoot}/search-lessons`, {
      params,
    });
    const response = await firstValueFrom(lessons$);
    return response.lessons;
  }

  saveLesson(lessonId: string, changes: Partial<Lesson>): Promise<Lesson> {
    return firstValueFrom(
      this.http.put<Lesson>(`${this.env.apiRoot}/lessons/${lessonId}`, changes)
    );
  }
}
