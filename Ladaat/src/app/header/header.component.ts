import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { User } from '../login/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  show: boolean = false;

  constructor(
    private userAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAuth.auth.onAuthStateChanged(user => {
      this.reloadUser();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.reloadUser();
      }
    })
  }

  logout() {
    this.userAuth.auth.signOut().then(user => {
      this.user = null;
      this.router.navigate(["login"]);
    });

  }

  isLoggedIn(): boolean {
    if (this.userAuth.auth && this.userAuth.auth.currentUser && this.userAuth.auth.currentUser.uid) {
      return true;
    }
    else {
      return false;
    }
  }

  private reloadUser() {
    this.user = new User();
    if (this.userAuth.auth.currentUser.photoURL) {
      this.user.avatar = this.userAuth.auth.currentUser.photoURL;
    }
    else {
      this.user.avatar = "src/assets/logos/Icon-turquiose-transparent.svg"
    }
    this.user.email = this.userAuth.auth.currentUser.email;
    this.user.name = this.userAuth.auth.currentUser.displayName;
  }
}
