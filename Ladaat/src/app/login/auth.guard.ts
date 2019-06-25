import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuth: AngularFireAuth,
		private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(resolve => this.userAuth.auth.onAuthStateChanged(resolve))
      .then(user => {
        if (next.routeConfig.component == LoginComponent) {
          console.log(next.routeConfig);
          if (user) {
            this.router.navigate(["tasks"]);
          }
          else {
            return true;
          }
        }
        else {
          if (user) {
            return true;
          }
          else {
            this.router.navigate(["login"]);
          }
        }
      });
  }
  
}
