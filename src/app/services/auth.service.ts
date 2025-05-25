import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();
  isLoggedIn = computed(() => !!this.user());

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    effect(() => {
      const user = this.user();

      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    });

    this.loadUserFromStorage();
  }

  loadUserFromStorage(): void {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json) as User;
      this.#userSignal.set(user);
    }
  }

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
