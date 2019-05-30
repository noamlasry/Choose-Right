import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  private listeners: {(user: User): void}[] = [];

  constructor(
    private userAuth: AngularFireAuth
  ) {
    this.userAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.initUser();
      }
    })
  }

  private initUser() {
    if (!this.user) {
      this.user = new User();
    }

    this.user.name = this.userAuth.auth.currentUser.displayName;
    this.user.email = this.userAuth.auth.currentUser.email;
    this.user.avatar = this.userAuth.auth.currentUser.photoURL;
    
    this.listeners.forEach(listener => {
      listener(this.user);
    });
  }

  onChange(callback: (user: User) => void): void {
    this.listeners.push(callback);
    callback(this.user);
  }

  setName(name: string): void {
    this.userAuth.auth.currentUser.updateProfile({displayName: name}).then(user => {
      this.initUser();
    });
  }

  setAvatar(avatar: File): void {
    var storageRef = firebase.storage().ref("users/" + this.userAuth.auth.currentUser.uid + "/avatar");
    storageRef.put(avatar).then(snapshot => {
      storageRef.getDownloadURL().then(url => {
        this.userAuth.auth.currentUser.updateProfile({photoURL: url}).then(user => {
          this.initUser();
        });
      });
    });
  }
}

export class User {
  name: string;
  email: string;
  avatar: string;
}