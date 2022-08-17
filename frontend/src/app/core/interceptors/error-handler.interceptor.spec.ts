import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { SnackBarService } from '../services/snack-bar.service';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    snackBarServiceSpy = jasmine.createSpyObj('snackBarService', [
      'showErrorMessage',
    ]);
    authServiceSpy = jasmine.createSpyObj('authService', ['logout']);
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        ErrorHandlerInterceptor,
        { provide: SnackBarService, useValue: snackBarServiceSpy },
        { provide: AuthenticationService, useValue: authServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(
      ErrorHandlerInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
