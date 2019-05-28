import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../shared.css', './header.component.css']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  email: string;

  constructor(
    private userAuth: AngularFireAuth,
		private router: Router
  ) {}

  ngOnInit() {
    this.userAuth.auth.onAuthStateChanged(user => {
			if (user) {
        this.email = user.email.split("@")[0];
				this.show = true;
      }
      else {
        this.show = false;
        this.email = null;
      }
    });
  }

  logout() {
    this.userAuth.auth.signOut();
    this.show = false;
    this.router.navigate(["login"]);
  }
}
