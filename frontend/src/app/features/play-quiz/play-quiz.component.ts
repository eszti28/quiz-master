import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { QuestionsAndAnswersViewModel } from 'src/app/shared/models/view/QuestionsAndAnswersViewModel';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss'],
})
export class PlayQuizComponent implements OnInit {
  questionsToTitle: QuestionsAndAnswersViewModel[] = [];
  correctAnswer: number = 0;
  currentScore: number = 0;
  scoreResult: string = '';

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

  isAnswerCorrect(answerId: number, questionId: number): void {
    this.quizService.isAnswerCorrect(answerId).subscribe((isCorrect) => {
      if (isCorrect === 1) {
        this.correctAnswer = answerId;
        this.currentScore++;
      } else {
        this.correctAnswer = answerId + 1000;
      }

      if (
        questionId ===
        this.questionsToTitle[this.questionsToTitle.length - 1].id
      ) {
        this.scoreResult = `Your score is ${this.currentScore}/${this.questionsToTitle.length}`;
        this.quizService.updateUserPoints(this.currentScore).subscribe();
      }
    });
  }
}
