import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../login/model/user';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { UpdaterService } from '../updater.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: User = new User();
  file: File;
  avatar: String;

  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  @ViewChild('picture') img;
  @ViewChild('avatar') input;

  constructor(
    private userAuth: AngularFireAuth,
    private updaterService: UpdaterService,
    private location: Location
  ) { }

  ngOnInit() {
      this.user.id = this.userAuth.auth.currentUser.uid;
  
      //We don't need to make this live since only the current user will update her own profile and no one else:
      this.updaterService.initializeSingle(this.usersRef,this.user.id, this.user, this.user);
  }

	onAvatarChanged(event) {
		if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.img.nativeElement.src = URL.createObjectURL(this.file);
    }
  }
  
  onSave() {
    const storageRef = firebase.storage().ref("users/" + this.user.id + "/avatar");

    if (this.file) {
      storageRef.put(this.file).then(() => {
        storageRef.getDownloadURL().then(url => {
          this.user.avatar = url;
          this.usersRef.child(this.user.id).set(this.user.toJSON()).then(() => this.location.back());
        });
      });
    }
    else if (!this.user.avatar || this.user.avatar == "") {
      storageRef.delete().then(() => {
        this.user.avatar = null;
        this.usersRef.child(this.user.id).set(this.user.toJSON()).then(() => this.location.back());
      });
    }
    else {
      this.usersRef.child(this.user.id).set(this.user.toJSON()).then(() => this.location.back());
    }
  }

  deleteAvatar() {
    this.avatar = "";
    this.user.avatar = null;
    this.file = null;
    this.img.nativeElement.src = null;
  }
}
