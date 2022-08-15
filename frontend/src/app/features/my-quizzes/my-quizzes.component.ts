import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/quizService';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss'],
})
export class MyQuizzesComponent implements OnInit {
  myQuizzes: QuizMainPageViewModel[];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizzesByUserId().subscribe((x) => {
      this.myQuizzes = x;
    });
  }
}
