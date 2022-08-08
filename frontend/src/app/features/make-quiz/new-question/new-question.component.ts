import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { AnswerAndIsCorrectViewModel } from 'src/app/shared/models/view/AnswerAndIsCorrectViewModel';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {
  form = new FormGroup({
    question: new FormControl('', Validators.required),
    answerOne: new FormControl('', Validators.required),
    answerTwo: new FormControl('', Validators.required),
    answerThree: new FormControl('', Validators.required),
    radioFormControl: new FormControl('', Validators.required),
  });

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {}

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
  }

  doneQuiz(): void {
    this.router.navigate(['/quizzes']);
  }
}
