import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email: string = "";
	password: string = "";

	constructor(
		private userAuth: AngularFireAuth,
		private router: Router
	) {}
	
	ngOnInit() {
		if (this.userAuth.auth && this.userAuth.auth.currentUser && this.userAuth.auth.currentUser.uid) {
			this.router.navigate(["tasks"]);
		}
	}
	
	enter() {
		this.userAuth.auth.signInWithEmailAndPassword(this.email, this.password)
			.then(() => this.router.navigate(["tasks"]))
			.catch(() => {alert("Invalid email or password")});
	}
}