import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl: String = environment.apiUrl;

  constructor(private router: Router) {}

  getApiUrl() {
    return this.apiUrl;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != null) {
      let parsedToken = JSON.parse(atob(token.split('.')[1]));
      return parsedToken;
    }
    return null;
  }

  navigateToAppLogin() {
    this.router.navigate(['']);
  }
}
