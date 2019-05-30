import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService, User } from '../login/user.service';

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
    private userService: UserService,
		private router: Router
  ) {}

  ngOnInit() {
    this.userService.onChange(user => {
      if (user) {
        this.user = user;
        this.show = true;
      }
      else {
        this.user = new User();
        this.show = false;
      }
    });
  }

  logout() {
    this.userAuth.auth.signOut();
    this.show = false;
    this.router.navigate(["login"]);
  }
}
