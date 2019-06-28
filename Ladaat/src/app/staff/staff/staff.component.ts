import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Member } from '../model/member';
import { Updater } from 'src/app/updater';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffRef: firebase.database.Reference = firebase.database().ref("staff");

  members: Member[] = [];

  constructor(
    private updater: Updater
  ) { }

  ngOnInit() {
    this.updater.initializeAndListenAll<Member>(this.staffRef, this.members, new Member())
		.then(() => {
			this.updater.updateAll();
			this.members.sort(this.staffSorting.comparator);
		});
  }

  sort<T>(sortData, compareFunction: (a: T, b: T) => number) {
    if (!sortData.comparator || compareFunction != sortData.comparator) {
      sortData.data.sort(compareFunction);
      sortData.ascending = true;
    }
    else {
      sortData.data.reverse();
      sortData.ascending = !sortData.ascending;
    }

    sortData.comparator = compareFunction;
  }

  staffSorting = {
    'data': this.members,
    'comparator': Member.compareLastNames,
    'ascending': true,
    'current': 'lastName'
  };

  sortMembersByLastName() {
    this.sort<Member>(this.staffSorting, Member.compareLastNames);
    this.staffSorting.current = 'lastName';
  }

  sortMembersByFirstName() {
    this.sort<Member>(this.staffSorting, Member.compareFirstNames);
    this.staffSorting.current = 'firstName';
  }

  sortMembersByPhone() {
    this.sort<Member>(this.staffSorting, Member.comparePhones);
    this.staffSorting.current = 'phone';
  }

  sortMembersByEmail() {
    this.sort<Member>(this.staffSorting, Member.compareEmails);
    this.staffSorting.current = 'email';
  }

  sortMembersByBirthdate() {
    this.sort<Member>(this.staffSorting, Member.compareBirthdates);
    this.staffSorting.current = 'birthdate';
  }

  hasUpdates(): boolean {
    return this.updater.hasUpdates();
  }

  update(): void {
    this.updater.updateAll();
  }
}
