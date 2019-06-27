import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Member } from '../model/member';
import { Updater } from 'src/app/updater';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  private staffRef: firebase.database.Reference = firebase.database().ref("staff");
  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  member: Member = new Member();
  constructor(
    private updaterService: Updater,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    this.updaterService.initializeAndListenSingle(this.staffRef, id, this.member, new Member())
    .then(() => this.updaterService.updateAll())
    .then(() => {
      if (this.member.modifiedBy) {
        this.member.modifiedByUser.id = this.member.modifiedBy;
        this.updaterService.initializeSingle(this.usersRef, this.member.modifiedBy, this.member.modifiedByUser, this.member.modifiedByUser);
      }
    });
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