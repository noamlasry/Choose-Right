import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['../../shared.css', './login.component.css']
})
export class LoginComponent implements OnInit {
	email: string = "";
	password: string = "";

	constructor(
		private userAuth: AngularFireAuth,
		private router: Router
	) {}
	
	ngOnInit() {
		this.userAuth.auth.onAuthStateChanged(user => {
			if (user) {
				this.router.navigate(["donors"]);
			}
		});
	}
	
	enter() {
		this.userAuth.auth.signInWithEmailAndPassword(this.email, this.password)
			.then(() => {this.router.navigate(['/donors'])})
			.catch(() => {alert("Invalid email or password")});
	}
}
