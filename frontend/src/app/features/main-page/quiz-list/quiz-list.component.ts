import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  quizzes: QuizMainPageViewModel[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getQuizMainInfo().subscribe((x) => {
      this.quizzes = x;
    });
  }

  addQuizParams(title: string, titleId: number) {
    this.router.navigate(['/play-quiz'], {
      queryParams: { title: title, titleId: titleId },
    });
  }
}
