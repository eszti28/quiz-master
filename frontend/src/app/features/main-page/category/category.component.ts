import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  quizzesByCategory: QuizMainPageViewModel[] = [];
  myParam: string;

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: Params) => this.myParam = params['category']);
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params['category']);
      this.quizService.chooseCategory(params['category']);
    });
    // this.quizService.getQuizMainInfo().subscribe((x) => {
    //   this.quizzesByCategory = x;
    // });
  }
}
