import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Course } from "../models/course.model";
import { GetCoursesResponse } from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  env = environment;

  http: HttpClient = inject(HttpClient);

  async getAllCourses(): Promise<Course[] | []> {
    const courses$: Observable<GetCoursesResponse> = this.http.get<GetCoursesResponse>(`${ this.env.apiRoot }/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses || [];
  }

  async postCourse(course: Partial<Course>): Promise<Course> {
    const course$: Observable<Course> = this.http.post<Course>(`${ this.env.apiRoot }/course`, course);
    const response = await firstValueFrom(course$);
    return response;
  }

  async putCourse(course: Course): Promise<Course> {
    const course$: Observable<Course> = this.http.put<Course>(`${ this.env.apiRoot }/course`, course);
    const response = await firstValueFrom(course$);
    return response;
  }

  async deleteCourse(courseId: string): Promise<void> {
    const course$: Observable<void> = this.http.delete<void>(`${ this.env.apiRoot }/courseId`);

  }
}
