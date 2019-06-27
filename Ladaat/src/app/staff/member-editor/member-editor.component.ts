import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Updater } from 'src/app/updater';
import { AngularFireAuth } from '@angular/fire/auth';
import { Member } from '../model/member';

@Component({
  selector: 'app-member-editor',
  templateUrl: './member-editor.component.html',
  styleUrls: ['./member-editor.component.css']
})
export class MemberEditorComponent implements OnInit {
  private staffRef: firebase.database.Reference = firebase.database().ref("staff");
  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  member: Member = new Member();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private updaterService: Updater,
    private userAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.member.id = this.route.snapshot.paramMap.get("id");

    if (this.member.id) {
      this.updaterService.initializeAndListenSingle(this.staffRef, this.member.id, this.member, new Member())
      .then(() => {
        if (this.member.modifiedBy) {
          this.member.modifiedByUser.id = this.member.modifiedBy;
          this.updaterService.initializeSingle(this.usersRef, this.member.modifiedBy, this.member.modifiedByUser, this.member.modifiedByUser);
        }
      });
    }
  }
  save(): void {		
		if (!this.member.firstName || !this.member.lastName) {
			return;
		}
		else {
			this.member.modifiedBy = this.userAuth.auth.currentUser.uid;

			if (this.member.id) {
				this.staffRef.child(this.member.id).update(this.member.toJSON())
				.then(() => {
					this.router.navigate(['/member/' + this.member.id]);
				});
			}
			else {
				let ref = this.staffRef.push(this.member.toJSON());
				ref.then(() => {
					this.router.navigate(['/member/' + ref.key]);
				});
			}
		}
  }
  
  delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.staffRef.child(this.member.id).remove().then(() => {
				this.router.navigate(['members']);
			});
		}
	}

  back() {
		if (this.member.id) {
			this.router.navigate(['/member/' + this.member.id]);
		}
		else {
			this.router.navigate(['staff']);
		}
	}
	hasUpdates(): boolean {
		return this.updaterService.hasUpdates();
	}

	update(): void {
		this.updaterService.updateAll();

		if (this.member.modifiedBy) {
			this.member.modifiedByUser.id = this.member.modifiedBy;
			this.updaterService.initializeSingle(this.usersRef, this.member.modifiedBy, this.member.modifiedByUser, this.member.modifiedByUser);
		}
	}
}