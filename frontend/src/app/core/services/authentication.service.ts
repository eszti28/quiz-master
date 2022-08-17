import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, mapTo, catchError, of } from 'rxjs';
import { UserLoginRequestViewModel } from 'src/app/shared/models/request/UserLoginRequestViewModel';
import { UserRegistrationRequestModel } from 'src/app/shared/models/request/UserRegistrationRequestModel';
import { UserLoginViewModel } from 'src/app/shared/models/view/UserLoginViewModel';
import { UserRegistrationViewModel } from 'src/app/shared/models/view/UserRegistrationViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUsername(): string {
    return localStorage.getItem('username') as string;
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getUserPoints(): string {
    return localStorage.getItem('points') as string;
  }

  setUserPoints(points: string): void {
    localStorage.setItem('points', points);
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

  login(loginData: UserLoginRequestViewModel): Observable<void> {
    return this.http
      .post<UserLoginViewModel>(`${environment.apiUrl}/user/login`, loginData)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.setUsername(response.username);
          this.setUserPoints(response.points.toString());
          this.router.navigate(['/quizzes']);
        }),
        mapTo(undefined)
      );
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}
