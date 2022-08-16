import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/quizService';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss'],
})
export class MyQuizzesComponent implements OnInit {
  myQuizzes: QuizMainPageViewModel[];
  noQuizzes: string;

  constructor(
    private quizService: QuizService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizzesByUserId().subscribe((x) => {
      if (x.length < 1) {
        this.noQuizzes = "You don't have any quizzes yet.";
      } else {
        this.myQuizzes = x;
      }
    });
  }

  deleteQuiz(quizId: number): void {
    this.quizService.deleteQuiz(quizId).subscribe();
    this.snackBarService.showSuccessMessage('Deleted');
  }
}
