import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { User } from '../login/model/user';
import * as firebase from 'firebase';
import { UpdaterService } from '../updater.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = new User();
  show: boolean = false;

  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  constructor(
    private userAuth: AngularFireAuth,
    private updaterService: UpdaterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.user.id = user.uid;
      
        //We don't need to make this live since only the current user will update her own profile and no one else:
        this.updaterService.initializeSingle(this.usersRef,this.user.id, this.user, this.user);
      }
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updaterService.initializeSingle(this.usersRef,this.user.id, this.user, this.user);
      }
    })
  }

  logout() {
    this.userAuth.auth.signOut().then(user => {
      this.user = new User();
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
}
