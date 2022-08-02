import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/services/quizService';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  quizzes: QuizMainPageViewModel[] = [];
  newestQuiz: QuizMainPageViewModel;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizMainInfo().subscribe(x => 
      this.quizzes = x);

    this.quizService.getNewestQuiz().subscribe(x => console.log(x));
  }
}
