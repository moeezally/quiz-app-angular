import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AppService } from "./app.service";
import { HttpClientModule } from '@angular/common/http';
import { HomeStudentComponent } from './home-student/home-student.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { HeaderComponent } from './components/header/header.component';
import { TeacherQuizzesComponent } from './home-teacher/teacher-quizzes/teacher-quizzes.component';
import { QuizService } from './utility/quiz/quiz.service';
import { AddQuizComponent } from './home-teacher/add-quiz/add-quiz.component';
import { UserService } from './utility/user/user.service';
import { StudentsComponent } from './home-teacher/students/students.component';
import { QuizzesComponent } from './home-student/quizzes/quizzes.component';
import { AttemptService } from './utility/attempts/attempt.service';
import { AttemptComponent } from './home-student/quizzes/attempt/attempt.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { NotAllowedComponent } from './utility/not-allowed/not-allowed/not-allowed.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeStudentComponent,
    HomeTeacherComponent,
    HeaderComponent,
    TeacherQuizzesComponent,
    AddQuizComponent,
    StudentsComponent,
    QuizzesComponent,
    AttemptComponent,
    NotAllowedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AppService,
    QuizService,
    UserService,
    AttemptService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
