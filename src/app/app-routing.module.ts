import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RoleGuard } from './auth/role.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { AttemptComponent } from './home-student/quizzes/attempt/attempt.component';
import { AddQuizComponent } from './home-teacher/add-quiz/add-quiz.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { StudentsComponent } from './home-teacher/students/students.component';
import { NotAllowedComponent } from './utility/not-allowed/not-allowed/not-allowed.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'loggedIn/student',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeStudentComponent,
      },
      {
        path: 'attempt/:id',
        component: AttemptComponent,
      },
    ],
    data: { type: 'Student' },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'loggedIn/teacher',
    children: [
      {
        path: 'quiz',
        children: [
          {
            path: 'add',
            component: AddQuizComponent,
          },
          {
            path: 'update/:id',
            component: AddQuizComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        component: HomeTeacherComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
    ],
    data: { type: 'Teacher' },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'not-allowed',
    component: NotAllowedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
