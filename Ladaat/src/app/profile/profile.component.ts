import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../login/model/user';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: User = new User();
  file: File;
  avatar: String;

  @ViewChild('picture') img;
  @ViewChild('avatar') input;

  constructor(
    private userAuth: AngularFireAuth,
    private location: Location
  ) { }

  ngOnInit() {
    this.userAuth.auth.onAuthStateChanged(user => {
      this.user = new User();
      this.user.avatar = user.photoURL;
      this.user.email = user.email;
      this.user.name = user.displayName;
    });
  }

	onAvatarChanged(event) {
		if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.img.nativeElement.src = URL.createObjectURL(this.file);
    }
  }
  
  onSave() {
    if (this.file) {
      var storageRef = firebase.storage().ref("users/" + this.userAuth.auth.currentUser.uid + "/avatar");

      storageRef.put(this.file).then(() => {
        storageRef.getDownloadURL().then(url => {
          this.userAuth.auth.currentUser.updateProfile({photoURL: url, displayName: this.user.name}).then(() => {
            this.location.back();
          });
        });
      });
    }
    else {
        this.userAuth.auth.currentUser.updateProfile({photoURL: null, displayName: this.user.name}).then(() => {
        this.location.back();
      });
    }
  }

  deleteAvatar() {
    this.avatar = "";
    this.user.avatar = null;
    this.file = null;
    this.img.nativeElement.src = null;
  }
}
