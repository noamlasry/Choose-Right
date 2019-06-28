/* 

  TODO:

  * Learn about JOINs in FB RT DB
  * Add displays for all types of records (combined, donations, documents, conversations)
  * Have each type of record take care of its own live updates, including:
    * the ability to pause live updates just for that component or recursively to child components
    * callback for the component to handle the new data before its applied
  * Filtering options, such as filter by date range
  * Either record who did the last modification or maintain an edit history with an option to view and restore previous edits

 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Donor } from '../model/donor';
import { Donation } from '../model/donation';
import * as firebase from 'firebase';
import { DonorConversation } from '../model/conversation';
import { DonorRecord } from '../model/record';
import { Updater } from '../../updater';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  private donorsRef: firebase.database.Reference = firebase.database().ref("donors");
  private donationsRef: firebase.database.Reference = firebase.database().ref("donations");
  private conversationsRef: firebase.database.Reference = firebase.database().ref("donor-conversations");
  private recordsRef: firebase.database.Reference = firebase.database().ref("donor-records");
  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  donor: Donor = new Donor();
  currentTab: string = "contact";

  constructor(
    private updaterService: Updater,
    private route: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    
    
    this.updaterService.initializeAndListenSingle(this.donorsRef, id, this.donor, new Donor()).then(snapshot => this.updaterService.updateAll())
    .then(snapshot => {
      if (this.donor.modifiedBy) {
        this.donor.modifiedByUser.id = this.donor.modifiedBy;
        this.updaterService.initializeSingle(this.usersRef, this.donor.modifiedBy, this.donor.modifiedByUser, this.donor.modifiedByUser);
      }
    });
    
    this.updaterService.initializeAndListenList(this.donationsRef, "donor", id, this.donor.donations, new Donation()).then(snapshot => {
      this.updaterService.updateAll();
      this.donor.donations.sort(this.donor.donationSorting.comparator);
    });

    this.updaterService.initializeAndListenList(this.conversationsRef, "donor", id, this.donor.conversations, new DonorConversation()).then(snapshot => {
      this.updaterService.updateAll();
      this.donor.conversations.sort(this.donor.conversationSorting.comparator);
    });

    this.updaterService.initializeAndListenList(this.recordsRef, "donor", id, this.donor.records, new DonorRecord()).then(snapshot => {
      this.updaterService.updateAll();
      this.donor.records.sort(this.donor.recordSorting.comparator);
    });

  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  hasUpdates(): boolean {
    return this.updaterService.hasUpdates();
  }

  update(): void {
    this.updaterService.updateAll();

    if (this.donor.modifiedBy) {
      this.donor.modifiedByUser.id = this.donor.modifiedBy;
      this.updaterService.initializeSingle(this.usersRef, this.donor.modifiedBy, this.donor.modifiedByUser, this.donor.modifiedByUser);
    }
  }
}