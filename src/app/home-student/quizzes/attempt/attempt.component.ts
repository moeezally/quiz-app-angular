import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AttemptService } from 'src/app/utility/attempts/attempt.service';
import { QuizService } from 'src/app/utility/quiz/quiz.service';
import { UserService } from 'src/app/utility/user/user.service';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css'],
})
export class AttemptComponent implements OnInit {
  id: any = null;
  quiz: any = {};
  questions: any[] = [];
  isActive = false;
  validationError: any = {};
  user: any;

  constructor(
    private appService: AppService,
    private quizService: QuizService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private attemptService: AttemptService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.quizService.getQuizById(this.id).subscribe(
        (res: any) => {
          console.log(res);

          this.quiz = res.data.quiz;
          this.questions = res.data.quiz.questions;
          this.generateQuestions();
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
    this.userService
      .getStudent(this.appService.getToken().id)
      .subscribe((res: any) => {
        this.user = res.data.student;
      });
  }

  save(correctAnswers: number, answers: String[]) {
    if (answers.length != this.questions.length) {
      alert('Attempt All Question');
      return;
    }

    let status = '';
    if (correctAnswers >= this.questions.length / 2) status = 'Pass';
    else status = 'Fail';

    let date = new Date();

    let attempt: any = {
      id: '',
      quiz_id: this.quiz,
      user_id: this.user,
      status: status,
      score: correctAnswers,
      answers: answers,
      taken_on:
        date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
    };

    console.log(attempt);

    this.attemptService.addAttempt(attempt).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/loggedIn/student']);
    });
  }

  validate() {
    let myDiv = document.getElementById('myDiv');
    let answerContainers: any;
    let correctAnswers = 0;
    let answers: String[] = [];

    if (myDiv != null) {
      answerContainers = myDiv.querySelectorAll('.answers');

      this.questions.forEach((question, i) => {
        let userAnswer = (
          answerContainers[i].querySelector(
            'input[name=question' + (i + 1) + ']:checked'
          ) || {}
        ).value;
        if (userAnswer != null) answers.push(userAnswer);
        if (userAnswer === question.answer) {
          correctAnswers++;
        }
      });
    }

    console.log(answers);
    console.log(correctAnswers);

    this.save(correctAnswers, answers);
  }

  generateQuestions() {
    let output: String[] = [];
    let answers: String[];
    let questionStatement: String = '';

    this.questions.forEach((question, j) => {
      answers = [];

      questionStatement = question.statement;

      for (let i = 1; i <= 4; i++) {
        let val = 'A';

        if (i == 1) {
          answers.push(
            "<div class='row p-3'>" +
              "<div class='col-md-6'>" +
              '<label style="cursor:pointer;" >' +
              '<input  type="radio" name="question' +
              (j + 1) +
              '" value="' +
              val +
              '"/>' +
              "<p  class='d-inline text-white ml-2'>" +
              val +
              ' : ' +
              question.optionA +
              '</p>' +
              '</label>' +
              '</div>'
          );
        }

        if (i == 2) {
          val = 'B';
          answers.push(
            "<div class='col-md-6 '>" +
              '<label style="cursor:pointer;">' +
              '<input type="radio" name="question' +
              (j + 1) +
              '" value="' +
              val +
              '"/>' +
              "<p class='d-inline text-white ml-2'>" +
              val +
              ' : ' +
              question.optionB +
              '</p>' +
              '</label>' +
              '</div>' +
              '</div>'
          );
        } else if (i == 3) {
          val = 'C';
          answers.push(
            "<div class='row p-3'>" +
              "<div class='col-md-6 '>" +
              '<label style="cursor:pointer;">' +
              '<input type="radio" name="question' +
              (j + 1) +
              '" value="' +
              val +
              '">' +
              "<p class=' d-inline text-white ml-2'>" +
              val +
              ' : ' +
              question.optionC +
              '</p>' +
              '</label>' +
              '</div>'
          );
        } else if (i == 4) {
          val = 'D';
          answers.push(
            "<div class='col-md-6 '>" +
              '<label style="cursor:pointer;">' +
              '<input type="radio" name="question' +
              (j + 1) +
              '" value="' +
              val +
              '">' +
              "<p class=' d-inline text-white ml-2'>" +
              val +
              ' : ' +
              question.optionD +
              '</p>' +
              '</label>' +
              '</div>' +
              '</div>'
          );
        }
      }

      output.push(
        "<div  class='form-group p-5 mb-4' style='background: rgba(80, 80, 80, 0.7);'>" +
          "<div class='row d-flex justify-content-between'>" +
          "<label class='h5 text-white' for='question'>" +
          ' Question ' +
          (j + 1) +
          '</label>' +
          '</div>' +
          " <label class='h5 text-white mt-2'  for='options'> Statement: " +
          questionStatement +
          ' </label>' +
          "  <div class='row mt-4'>" +
          "<div class='col-md-12'>" +
          "<label class='h5 text-white' for='options'> Options </label>" +
          "<div class='answers'>" +
          answers.join('') +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
      );
    });

    let div = document.getElementById('myDiv');
    if (div != null) div.innerHTML = output.join('');
  }
}
