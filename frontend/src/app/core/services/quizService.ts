import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddNewQuestionRequestModel } from 'src/app/shared/models/request/AddNewQuestionRequestModel';
import { addTitleRequestModel } from 'src/app/shared/models/request/addTitleRequestModel';
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
    form: AbstractControl
  ): Observable<AddNewQuestionRequestModel> {
    return this.http.post<AddNewQuestionRequestModel>(
      `${environment.apiUrl}/make-quiz/new-question`,
      {
        question: form.value.question,
        answerOne: form.value.answerOne,
        answerTwo: form.value.answerTwo,
        answerThree: form.value.answerThree,
        correctAnswer: form.value.radioFormControl,
      }
    );
  }
}
