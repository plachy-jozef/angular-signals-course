import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from 'express';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();
  isLoggedIn = computed(() => !!this.user());

  http = inject(HttpClient);
  router = inject(Router);

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${environment.apiRoot}/login`, {
      email,
      password,
    });

    const user: User = await firstValueFrom(login$);

    this.#userSignal.set(user);

    return user;
  }

  async logout(): Promise<void> {
    this.#userSignal.set(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    await this.router.navigate(['/login']);
  }
}
