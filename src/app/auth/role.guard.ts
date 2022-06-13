import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private appService: AppService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.appService.getToken().type==route.data['type']) {
      return true;
    }

    this.router.navigate(['/not-allowed'])
    return false;
  }
}