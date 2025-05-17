
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from "express";
import { createCourse } from "./create-course.route";
import { deleteCourse } from "./delete-course.route";
import { getAllCourses, getCourseById } from "./get-courses.route";
import { loginUser } from './login.route';
import { saveCourse } from './save-course.route';
import { saveLesson } from "./save-lesson.route";
import { searchLessons } from "./search-lessons.route";

const app: Application = express();

app.use(bodyParser.json());

app.use(cors({ origin: true }));
app.route('/api/courses').get(getAllCourses);

app.route('/api/courses').post(createCourse);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/search-lessons').get(searchLessons);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/courses/:id').delete(deleteCourse);

app.route('/api/lessons/:id').put(saveLesson);

app.route('/api/login').post(loginUser);

const httpServer = app.listen(9000, () => {
  const address = httpServer.address();
  const port = typeof address === 'string' ? address : address?.port;
  console.log("HTTP REST API Server running at http://localhost:" + port);
});
