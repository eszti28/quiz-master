import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  makeQuiz(): void {
    this.router.navigate(['/make-quiz']);
  }

  getQuizzesById(): void {
    this.router.navigate(['/my-quizzes']);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
