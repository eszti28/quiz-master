import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { QuestionsToTitleViewModel } from 'src/app/shared/models/view/QuestionsToTitleViewModel';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss'],
})
export class PlayQuizComponent implements OnInit {
  questionsToTitle: QuestionsToTitleViewModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.quizService.playQuiz(params.get('titleId')).subscribe((x) => {
        console.log(x);
        this.questionsToTitle = x;
      });
    });
  }
}
