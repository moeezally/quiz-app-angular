import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient, private appService: AppService) {}

  getAll() {
    return this.http.get(this.appService.getApiUrl() + 'api/quiz');
  }

  getTeacherQuizzes(id: any) {
    return this.http.get(
      this.appService.getApiUrl() + 'api/quiz/teacher/' + id
    );
  }

  getQuizById(id: any) {
    return this.http.get(this.appService.getApiUrl() + 'api/quiz/' + id);
  }

  getActiveQuizzes() {
    return this.http.get(this.appService.getApiUrl() + 'api/quiz/active');
  }

  addQuiz(quiz: any) {
    console.log(quiz);
    return this.http.post(this.appService.getApiUrl() + 'api/quiz', quiz);
  }

  delete(id: any) {
    return this.http.delete(this.appService.getApiUrl() + 'api/quiz/' + id);
  }
}
