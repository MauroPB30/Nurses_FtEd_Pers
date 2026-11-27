import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const inputEvent = (value: string) => ({ target: { value } }) as unknown as Event;

  const fillForm = (user: string, password: string) => {
    component.onUserInput(inputEvent(user));
    component.onPasswordInput(inputEvent(password));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideTranslateService(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows required errors when the form is empty', () => {
    component.submit();

    expect(component.status()).toBe('invalid-form');
    expect(component.errors()).toEqual([
      { field: 'LOGIN.USER', message: 'COMMON.ERROR_REQUIRED' },
      { field: 'LOGIN.PASSWORD', message: 'COMMON.ERROR_REQUIRED' },
    ]);
  });

  it('shows min length errors with their params', () => {
    fillForm('ab', '12');
    component.submit();

    expect(component.status()).toBe('invalid-form');
    expect(component.errors()).toEqual([
      { field: 'LOGIN.USER', message: 'LOGIN.ERROR_USER_MIN', params: { min: 3 } },
      { field: 'LOGIN.PASSWORD', message: 'LOGIN.ERROR_PASSWORD_MIN', params: { min: 4 } },
    ]);
  });

  it('logs in with the demo credentials (trimming the user)', () => {
    fillForm(' nurse ', '1234');
    component.submit();

    expect(component.status()).toBe('success');
    expect(component.errors()).toEqual([]);
  });

  it('rejects valid-format but wrong credentials', () => {
    fillForm('nurse', '9999');
    component.submit();

    expect(component.status()).toBe('invalid-credentials');
    expect(component.errors()).toEqual([]);
  });

  it('toggles password visibility', () => {
    expect(component.passwordType()).toBe('password');

    component.togglePassword();
    expect(component.showPassword()).toBe(true);
    expect(component.passwordType()).toBe('text');

    component.togglePassword();
    expect(component.showPassword()).toBe(false);
    expect(component.passwordType()).toBe('password');
  });

  it('resets feedback when the user types again', () => {
    component.submit();
    expect(component.status()).toBe('invalid-form');

    component.onUserInput(inputEvent('n'));

    expect(component.status()).toBe('idle');
    expect(component.errors()).toEqual([]);
  });
});