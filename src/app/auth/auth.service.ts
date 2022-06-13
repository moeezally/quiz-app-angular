import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private appService: AppService) {}

  login(loginObj: any) {
    return this.http.post(
      this.appService.getApiUrl() + 'api/auth/login',
      loginObj
    );
  }

  signup(signupObj: any) {
    return this.http.post(
      this.appService.getApiUrl() + 'api/auth/signup',
      signupObj
    );
  }
}
