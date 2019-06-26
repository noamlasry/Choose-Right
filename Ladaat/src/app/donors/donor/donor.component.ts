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
import { UpdaterService } from '../../updater.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  donor: Donor = new Donor();
  currentTab: string = "contact";

  constructor(
    private donorService: UpdaterService,
    private route: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    
    const donorsRef = firebase.database().ref("donors");
    const donationsRef = firebase.database().ref("donations");
    const conversationsRef = firebase.database().ref("donor-conversations");
    const recordsRef = firebase.database().ref("donor-records");
    
    this.donorService.initializeAndListenSingle(donorsRef, id, this.donor, new Donor()).then(snapshot => this.donorService.updateAll());
    
    this.donorService.initializeAndListenList(donationsRef, "donor", id, this.donor.donations, new Donation()).then(snapshot => {
      this.donorService.updateAll();
      this.donor.donations.sort(this.donor.donationSorting.comparator);
    });

    this.donorService.initializeAndListenList(conversationsRef, "donor", id, this.donor.conversations, new DonorConversation()).then(snapshot => {
      this.donorService.updateAll();
      this.donor.conversations.sort(this.donor.conversationSorting.comparator);
    });

    this.donorService.initializeAndListenList(recordsRef, "donor", id, this.donor.records, new DonorRecord()).then(snapshot => {
      this.donorService.updateAll();
      this.donor.records.sort(this.donor.recordSorting.comparator);
    });

  }

  hasUpdates(): boolean {
    return this.donorService.hasUpdates();
  }

  update(): void {
    this.donorService.updateAll();
  }
}