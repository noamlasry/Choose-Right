import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../shared.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatar: string;
  nick: string;

  constructor(
    private userAuth: AngularFireAuth,
    private location: Location
  ) { }

  ngOnInit() {
    //load the nick:
    this.nick = this.userAuth.auth.currentUser.displayName;

    //load the photo url:

		var storage = firebase.storage();
		var avatarRef = storage.ref("images/avatar");

		// Get the download URL
		avatarRef.getDownloadURL().then(url => {
			this.avatar = url;
		}).catch(error => {

		// A full list of error codes is available at
		// https://firebase.google.com/docs/storage/web/handle-errors
		switch (error.code) {
			case 'storage/object-not-found':
			// File doesn't exist
			break;

			case 'storage/unauthorized':
			// User doesn't have permission to access the object
			break;

			case 'storage/canceled':
			// User canceled the upload
			break;

			case 'storage/unknown':
			// Unknown error occurred, inspect the server response
			break;
		}
		});
  }

  selectImage() {

  }

  save() {
		this.userAuth.auth.currentUser.updateProfile({displayName: this.nick, photoURL: this.avatar}).then(a => {
			this.location.back();
		});
  }
}
