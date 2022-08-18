import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-make-quiz',
  templateUrl: './make-quiz.component.html',
  styleUrls: ['./make-quiz.component.scss'],
})
export class MakeQuizComponent {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    selectFormControl: new FormControl('', Validators.required),
  });

  constructor(
    private quizService: QuizService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get selectFormControl(): AbstractControl {
    return this.form.get('selectFormControl');
  }

  addNewTitle(): void {
    this.quizService
      .addNewTitle(this.title, this.selectFormControl)
      .subscribe(() => {
        this.snackBarService.showSuccessMessage('Title added');
      });
    this.router.navigate(['/make-quiz/new-question']);
  }
}
