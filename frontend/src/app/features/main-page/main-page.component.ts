import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { CategoryType } from 'src/app/shared/models/enums/CategoryType';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  newestQuiz: QuizMainPageViewModel;
  imageURL: string;
  CategoryType = CategoryType;

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizMainInfo().subscribe((x) => {
      this.newestQuiz = x[0];
      this.imageURL = `../../../assets/${x[0].category}.png`;
    });
  }

  appendQueryParams(categoryTypeId: number) {
    this.router.navigate(['/quizzes/categories'], {
      queryParams: { category: `${CategoryType[categoryTypeId]}` },
    });
  }
}
