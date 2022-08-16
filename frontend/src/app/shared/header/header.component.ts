import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { QuizService } from 'src/app/core/services/quizService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userPoints: number;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizService.getUserPoints().subscribe((x) => {
      this.userPoints = x.points;
    });
  }

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
