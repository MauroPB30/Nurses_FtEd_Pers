import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

type LoginStatus = 'idle' | 'invalid-form' | 'invalid-credentials' | 'success';

interface LoginError {
  field: string;
  message: string;
  params?: Record<string, unknown>;
}

const DEMO_CREDENTIALS = { user: 'nurse', password: '1234' } as const;
const MIN_USER_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 4;

@Component({
  selector: 'app-login',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly demoCredentials = DEMO_CREDENTIALS;
  readonly minUserLength = MIN_USER_LENGTH;
  readonly minPasswordLength = MIN_PASSWORD_LENGTH;

  user = signal('');
  password = signal('');
  showPassword = signal(false);
  status = signal<LoginStatus>('idle');
  errors = signal<LoginError[]>([]);

  passwordType = computed(() => (this.showPassword() ? 'text' : 'password'));
  toggleLabel = computed(() =>
    this.showPassword() ? 'LOGIN.HIDE_PASSWORD' : 'LOGIN.SHOW_PASSWORD',
  );

  togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  onUserInput(event: Event): void {
    this.user.set((event.target as HTMLInputElement).value);
    this.resetFeedback();
  }

  onPasswordInput(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
    this.resetFeedback();
  }

  submit(event?: Event): void {
    event?.preventDefault();

    const user = this.user().trim();
    const password = this.password();
    const errors: LoginError[] = [];

    if (user === '') {
      errors.push({ field: 'LOGIN.USER', message: 'COMMON.ERROR_REQUIRED' });
    } else if (user.length < MIN_USER_LENGTH) {
      errors.push({
        field: 'LOGIN.USER',
        message: 'LOGIN.ERROR_USER_MIN',
        params: { min: MIN_USER_LENGTH },
      });
    }

    if (password === '') {
      errors.push({ field: 'LOGIN.PASSWORD', message: 'COMMON.ERROR_REQUIRED' });
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      errors.push({
        field: 'LOGIN.PASSWORD',
        message: 'LOGIN.ERROR_PASSWORD_MIN',
        params: { min: MIN_PASSWORD_LENGTH },
      });
    }

    if (errors.length > 0) {
      this.errors.set(errors);
      this.status.set('invalid-form');
      return;
    }

    this.errors.set([]);
    if (user === DEMO_CREDENTIALS.user && password === DEMO_CREDENTIALS.password) {
      this.status.set('success');
    } else {
      this.status.set('invalid-credentials');
    }
  }

  private resetFeedback(): void {
    this.status.set('idle');
    this.errors.set([]);
  }
}