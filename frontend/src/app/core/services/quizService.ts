import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getNewestQuiz(): Observable<QuizMainPageViewModel> {
    return this.http.get<QuizMainPageViewModel>(
      `${environment.apiUrl}/quizzes/newest-quiz`
    );
  }
}
