import { Routes } from '@angular/router';
import { isUserAutheticated } from './auth.guard';
import { CourseComponent } from './course/course.component';
import { HomeSignalComponent } from './home-signal/home-signal.component';
import { HomeComponent } from './home/home.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LinkedSignalDemoComponent } from './linked-signal/linked-signal-demo.component';
import { LoginComponent } from './login/login.component';
import { ResourceDemoComponent } from './resource-demo/resource-demo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAutheticated],
  },
  {
    path: 'course/:courseId',
    component: CourseComponent,
  },
  {
    path: 'home-signal',
    component: HomeSignalComponent,
    canActivate: [isUserAutheticated],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [isUserAutheticated],
  },
  {
    path: 'shopping-cart',
    component: LinkedSignalDemoComponent,
    canActivate: [isUserAutheticated],
  },
  {
    path: 'resource-demo',
    component: ResourceDemoComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
