import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['../../shared.css', './login.component.css']
})
export class LoginComponent implements OnInit {
	@ViewChild('email') emailField;
	@ViewChild('password') passwordField;

	email: string = "";
	password: string = "";

	constructor(
		private userAuth: AngularFireAuth,
		private router: Router
	) { }

	ngOnInit() {}
	
	enter() {
		this.userAuth.auth.signInWithEmailAndPassword(this.email, this.password)
			.then(() => {this.router.navigate(['/donors'])})
			.catch(() => {alert("Invalid email or password")});
	}
}
