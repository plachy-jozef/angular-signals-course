import { Routes } from '@angular/router';
import { HomeSignalComponent } from './home-signal/home-signal.component';
import { HomeComponent } from "./home/home.component";
import { LessonsComponent } from "./lessons/lessons.component";
import { LinkedSignalDemoComponent } from "./linked-signal/linked-signal-demo.component";
import { LoginComponent } from "./login/login.component";
import { ResourceDemoComponent } from "./resource-demo/resource-demo.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home-signal',
    component: HomeSignalComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path: "shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
