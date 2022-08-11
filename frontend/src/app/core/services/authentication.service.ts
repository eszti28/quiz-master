import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserRegistrationRequestModel } from 'src/app/shared/models/request/UserRegistrationRequestModel';
import { UserRegistrationViewModel } from 'src/app/shared/models/view/UserRegistrationViewModel';
import { environment } from 'src/environments/environment';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUsername(): void {
    localStorage.getItem('username') as string;
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  registerUser(
    userdata: UserRegistrationRequestModel
  ): Observable<UserRegistrationViewModel> {
    return this.http
      .post<UserRegistrationViewModel>(
        `${environment.apiUrl}/user/register`,
        userdata
      )
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        }),
        catchError(() => of(null))
      );
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}
