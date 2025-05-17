import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Course } from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;

  async getAllCourses(): Promise<Course[] | []> {
    const response = await fetch(`${ this.env.apiRoot }/courses`);
    if (response.ok) {
      const payload = await response.json();
      return payload.courses;
    }
    return [];
  }
}
