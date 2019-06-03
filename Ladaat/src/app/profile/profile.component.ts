import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from '../login/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: User = new User();
  file: File;
  @ViewChild('picture') img;

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
		this.userService.onChange(user => {
      if (user) {
        this.user.avatar = user.avatar;
        this.user.email = user.email;
        this.user.name = user.name;
      }
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
      this.userService.setAvatar(this.file);
    }

    this.userService.setName(this.user.name);
  }
}
