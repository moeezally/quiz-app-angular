import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private appService: AppService) {}

  getTeacher(id: any) {
    return this.http.get(
      this.appService.getApiUrl() + 'api/user/teachers/' + id
    );
  }

  getAllTeachers() {
    return this.http.get(this.appService.getApiUrl() + 'api/user/teachers');
  }

  getAllStudents() {
    return this.http.get(this.appService.getApiUrl() + 'api/user/students');
  }

  getStudent(id: any) {
    return this.http.get(
      this.appService.getApiUrl() + 'api/user/students/' + id
    );
  }

  addStudent(user: any) {
    return this.http.post(
      this.appService.getApiUrl() + 'api/user/students/',
      user
    );
  }

  deleteStudent(id: any) {
    return this.http.delete(
      this.appService.getApiUrl() + 'api/user/students/' + id
    );
  }
}
