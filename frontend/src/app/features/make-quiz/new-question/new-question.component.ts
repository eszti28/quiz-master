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
import { AnswerAndIsCorrectViewModel } from 'src/app/shared/models/view/AnswerAndIsCorrectViewModel';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent {
  form = new FormGroup({
    question: new FormControl('', Validators.required),
    answerOne: new FormControl('', Validators.required),
    answerTwo: new FormControl('', Validators.required),
    answerThree: new FormControl('', Validators.required),
    radioFormControl: new FormControl('', Validators.required),
  });

  constructor(
    private quizService: QuizService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  get question(): AbstractControl {
    return this.form.get('question');
  }

  get answerOne(): AbstractControl {
    return this.form.get('answerOne');
  }

  get answerTwo(): AbstractControl {
    return this.form.get('answerTwo');
  }

  get answerThree(): AbstractControl {
    return this.form.get('answerThree');
  }

  get radioFormControl(): AbstractControl {
    return this.form.get('radioFormControl');
  }

  addQuestion(): void {
    const result: AnswerAndIsCorrectViewModel[] = [
      {
        answer: this.answerOne.value,
        isCorrect: this.radioFormControl.value === '1',
      },
      {
        answer: this.answerTwo.value,
        isCorrect: this.radioFormControl.value === '2',
      },
      {
        answer: this.answerThree.value,
        isCorrect: this.radioFormControl.value === '3',
      },
    ];
    this.quizService.addNewQuestion(this.question.value, result).subscribe();
    this.snackBarService.showSuccessMessage('Question added');
    this.form.reset();
  }

  doneQuiz(): void {
    this.router.navigate(['/quizzes']);
  }
}
