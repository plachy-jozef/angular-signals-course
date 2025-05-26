import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  env = environment;

  http: HttpClient = inject(HttpClient);

  async getAllCourses(): Promise<Course[] | []> {
    const courses$: Observable<GetCoursesResponse> = this.http.get<GetCoursesResponse>(
      `${this.env.apiRoot}/courses` /**,
      {
        context: new HttpContext().set(SkipLoading, true)
      }*/
    );
    const response = await firstValueFrom(courses$);
    return response.courses ?? [];
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course$: Observable<Course> = this.http.get<Course>(
      `${this.env.apiRoot}/courses/${courseId}`
    );

    return await firstValueFrom(course$);
  }

  async postCourse(course: Partial<Course>): Promise<Course> {
    const response$: Observable<Course> = this.http.post<Course>(
      `${this.env.apiRoot}/courses`,
      course
    );
    return firstValueFrom(response$);
  }

  async putCourse(courseId: string, course: Partial<Course>): Promise<Course> {
    const response$: Observable<Course> = this.http.put<Course>(
      `${this.env.apiRoot}/courses/${courseId}`,
      course
    );
    return firstValueFrom(response$);
  }

  async deleteCourse(courseId: string): Promise<void> {
    const response$: Observable<void> = this.http.delete<void>(
      `${this.env.apiRoot}/courses/${courseId}`
    );
    return firstValueFrom(response$);
  }
}
