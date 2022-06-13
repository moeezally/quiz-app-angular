import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private appService: AppService) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }

    this.appService.navigateToAppLogin();
    return false;
  }
}
