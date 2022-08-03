import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { CategoryType } from '../models/enums/CategoryType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  CategoryType = CategoryType;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {}

  appendQueryParams(categoryTypeId: number) {
    this.router.navigate(['/quizzes'], {
      queryParams: { category: `${CategoryType[categoryTypeId]}` },
    });
  }
}
