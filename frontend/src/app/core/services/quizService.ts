import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddNewQuestionRequestModel } from 'src/app/shared/models/request/AddNewQuestionRequestModel';
import { addTitleRequestModel } from 'src/app/shared/models/request/addTitleRequestModel';
import { AnswerAndIsCorrectViewModel } from 'src/app/shared/models/view/AnswerAndIsCorrectViewModel';
import { QuizMainPageViewModel } from 'src/app/shared/models/view/QuizMainPageViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizMainInfo(): Observable<QuizMainPageViewModel[]> {
    return this.http.get<QuizMainPageViewModel[]>(
      `${environment.apiUrl}/quizzes/main-info`
    );
  }

  chooseCategory(category: string): Observable<QuizMainPageViewModel[]> {
    return this.http.get<QuizMainPageViewModel[]>(
      `${environment.apiUrl}/quizzes/category/${category}`
    );
  }

  addNewTitle(
    title: AbstractControl,
    selectFormControl: AbstractControl
  ): Observable<addTitleRequestModel> {
    return this.http.post<addTitleRequestModel>(
      `${environment.apiUrl}/make-quiz/title`,
      {
        title: title.value,
        category: selectFormControl.value,
        userId: 2,
      }
    );
  }

  addNewQuestion(
    question: string,
    result: AnswerAndIsCorrectViewModel[]
  ): Observable<AddNewQuestionRequestModel> {
    return this.http.post<AddNewQuestionRequestModel>(
      `${environment.apiUrl}/make-quiz/new-question`,
      {
        question: question,
        answerOne: result[0].answer,
        isCorrectOne: result[0].isCorrect,
        answerTwo: result[1].answer,
        isCorrectTwo: result[1].isCorrect,
        answerThree: result[2].answer,
        isCorrectThree: result[2].isCorrect,
      }
    );
  }
}
