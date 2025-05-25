import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);

  messagesService: MessagesService = inject(MessagesService);

  form: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  async onLogin() {
    try {
      const { email, password } = this.form.value;
      if (!email || !password) {
        this.messagesService.showMessage('Please fill in all fields', 'error');
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login failed', error);
      this.messagesService.showMessage('Login failed', 'error');
    }
  }
}
