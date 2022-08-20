import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
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
    private snackBarService: SnackBarService,
    private router: Router,
    private dialog: MatDialog
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

  newQuestion(quizId: number): void {
    this.router.navigate(['/make-quiz/new-question'], {
      queryParams: {
        quizId: quizId,
      },
    });
  }

  deleteQuiz(quizId: number): void {
    const dialog = this.dialog.open(ConfirmDialogComponent);

    dialog.afterClosed().subscribe((x) => {
      if (x) {
        this.quizService.deleteQuiz(quizId).subscribe(() => {
          this.snackBarService.showSuccessMessage('Deleted');
          this.ngOnInit();
        });
      }
    });
  }
}
