import { Component, Input, OnInit } from '@angular/core';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  @Input() quizData: QuizMainPageViewModel;

  constructor() { }

  ngOnInit(): void {
  }

}
