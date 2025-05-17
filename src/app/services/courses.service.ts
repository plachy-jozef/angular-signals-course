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
}
