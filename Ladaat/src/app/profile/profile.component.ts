import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService, User } from '../login/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: User;
	file: File;

  constructor(
		private userAuth: AngularFireAuth,
		private userService: UserService
  ) { }

  ngOnInit() {
		this.userService.onChange(user => {
      if (user) {
				this.user = user;
      }
      else {
        this.user = new User();
      }
		});
  }
	onAvatarChanged(event) {
		if(event.target.files.length > 0) {
			this.file = event.target.files[0];
			this.userService.setAvatar(this.file);
		}
	}

  onNickChanged() {
		this.userService.setName(this.user.name);
  }
}
