import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['../../shared.css', './login.component.css']
})
export class LoginComponent implements OnInit {
	@ViewChild('email') emailField;
	@ViewChild('password') passwordField;

	constructor(
		private userAuth: AngularFireAuth,
		private router: Router
	) { }

	ngOnInit() {
		
	}
	
	enter() {
	
		this.userAuth.auth.signInWithEmailAndPassword(this.emailField.nativeElement.value, this.passwordField.nativeElement.value)
			.then(() => {this.router.navigate(['/donors'])})
			.catch(() => {alert("Invalid email or password")});
	}
}
