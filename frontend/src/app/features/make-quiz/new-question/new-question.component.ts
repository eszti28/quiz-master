import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';

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
    return this.form.get('answerOne');
  }

  get answerThree(): AbstractControl {
    return this.form.get('answerOne');
  }

  get radioFormControl(): AbstractControl {
    return this.form.get('radioFormControl');
  }

  addQuestion(): void {
    console.log(this.form);
    this.quizService.addNewQuestion(this.form).subscribe();
    this.form.reset(' ');
  }

  doneQuiz(): void {
    this.router.navigate(['/quizzes']);
  }
}
