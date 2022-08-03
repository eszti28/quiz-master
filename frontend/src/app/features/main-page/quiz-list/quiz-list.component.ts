import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/quizService';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  quizzes: QuizMainPageViewModel[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizMainInfo().subscribe((x) => {
      this.quizzes = x;
    });
  }
}
