import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuizService } from 'src/app/core/services/quizService';

@Component({
  selector: 'app-make-quiz',
  templateUrl: './make-quiz.component.html',
  styleUrls: ['./make-quiz.component.scss'],
})
export class MakeQuizComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  get title(): AbstractControl {
    return this.form.get('title');
  }

  addNewTitle(): void {
    this.quizService.addNewTitle(this.title).subscribe();
  }
}
