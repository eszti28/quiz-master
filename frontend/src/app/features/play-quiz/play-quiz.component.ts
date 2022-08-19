import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/services/quizService';
import { QuestionsAndAnswersViewModel } from 'src/app/shared/models/view/QuestionsAndAnswersViewModel';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss'],
})
export class PlayQuizComponent implements OnInit {
  allQuestions: QuestionsAndAnswersViewModel[] = [];
  correctAnswer: number = 0;
  currentScore: number = 0;
  scoreResult: string = '';
  index: number = 0;
  currentQuestion: QuestionsAndAnswersViewModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.quizService.playQuiz(params.get('titleId')).subscribe((x) => {
        this.allQuestions = x;
        this.currentQuestion = x[0];
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

      if (questionId === this.allQuestions[this.allQuestions.length - 1].id) {
        this.scoreResult = `Your score is ${this.currentScore}/${this.allQuestions.length}`;
        this.quizService.updateUserPoints(this.currentScore).subscribe((x) => {
          this.authenticationService.setUserPoints(x);
        });
      }
    });

    setTimeout(() => {
      if (this.index < this.allQuestions.length - 1) {
        this.index++;
        this.currentQuestion = this.allQuestions[this.index];
      }
    }, 2500);
  }
}
