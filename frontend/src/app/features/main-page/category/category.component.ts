import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  quizzesByCategory: QuizMainPageViewModel[] = [];

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.get('category') === 'All') {
        this.quizService.getQuizMainInfo().subscribe((x) => {
          this.quizzesByCategory = x;
        });
      } else {
        this.quizService
          .chooseCategory(params.get('category'))
          .subscribe((x) => {
            this.quizzesByCategory = x;
          });
      }
    });
  }

  playNewestQuiz(title: string, titleId: number) {
    this.router.navigate(['/play-quiz'], {
      queryParams: { title: title, titleId: titleId },
    });
    this.quizService.playNewestQuiz(titleId).subscribe((x) => {
      console.log(x);
    });
  }
}
