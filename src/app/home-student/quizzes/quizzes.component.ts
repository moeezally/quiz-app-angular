import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AttemptService } from 'src/app/utility/attempts/attempt.service';
import { QuizService } from 'src/app/utility/quiz/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
})
export class QuizzesComponent implements OnInit {
  quizzes: any[] = [];
  isLoading = true;
  attempts: any[] = [];
  takenQuizzes: any[] = [];
  allowedQuizzes: any[] = [];

  constructor(
    private quizService: QuizService,
    private appService: AppService,
    private attemptService: AttemptService
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token != null) {
      let parsedToken = JSON.parse(atob(token.split('.')[1]));
      this.quizService.getAll().subscribe((res: any) => {
        console.log(res);

        this.quizzes = res.data.quizzes;
        this.findAttempts(parsedToken.id);
      });
    }
  }

  findAttempts(Id: any) {
    this.attemptService.getStudentAttempts(Id).subscribe((res: any) => {
      console.log(res);
      this.attempts = res.data.attempts;
      this.findTakenQuizzes();
      this.findAllowedQuizzes();
      this.isLoading = false;
    });
  }

  findTakenQuizzes() {
    this.takenQuizzes = this.quizzes.filter((quiz) => {
      let attempted = false;

      this.attempts.forEach((attempt) => {
        if (quiz.id == attempt.quiz_id.id) {
          attempted = true;
        }
      });

      if (attempted) return quiz;
    });
    console.log(this.takenQuizzes);
  }

  findAllowedQuizzes() {
    this.allowedQuizzes = this.quizzes.filter((quiz) => {
      let attempted = false;

      this.attempts.forEach((attempt) => {
        if (quiz.id == attempt.quiz_id.id) {
          attempted = true;
        }
      });

      if (!attempted) {
        if (quiz.is_Active) return quiz;
      }
    });
    console.log(this.allowedQuizzes);
  }

  setModalData(id: any) {
    let attempt = this.attempts.find((attempt) => attempt.quiz_id.id == id);
    let name = document.getElementById('attempt_name');
    if (name != null) name.innerHTML = attempt.quiz_id.name;
    let status = document.getElementById('attempt_status');
    if (status != null) status.innerHTML = attempt.status;
    let score = document.getElementById('attempt_score');
    if (score != null)
      score.innerHTML = attempt.score + '/' + attempt.quiz_id.questions.length;
    let taken_on = document.getElementById('attempt_on');
    if (taken_on != null) taken_on.innerHTML = attempt.taken_on;
  }
}
