import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  addNewTitle(title: AbstractControl): Observable<addTitleRequestModel> {
    return this.http.post<addTitleRequestModel>(
      `${environment.apiUrl}/make-quiz/title`,
      {
        title: title.value,
        category: 'Sport',
        userId: 2,
      }
    );
  }
}
