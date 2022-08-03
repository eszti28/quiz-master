import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
    let queryParams = new HttpParams();
    queryParams = queryParams.append('category', category);

    return this.http.get<QuizMainPageViewModel[]>(
      `${environment.apiUrl}/quizzes/category`,
      { params: queryParams }
    );
  }
}
