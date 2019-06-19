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

import { Donor } from '../donor';
import { Donation } from '../donation';
import * as firebase from 'firebase';
import { DonorConversation } from '../conversation';
import { DonorRecord } from '../record';
import { UpdaterService } from '../../updater.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  donor: Donor = new Donor();
  sortField: string = "date";
  currentTab: string ='contact';
  
  currentSort: (a: Donation, b: Donation) => number;

  // updates = [];

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
    
    this.donorService.initializeSingle(donorsRef, id, this.donor, new Donor()).then(snapshot => {
      this.donorService.addSingleListener(donorsRef, id, this.donor, new Donor());
    });

    this.donorService.initializeList(donationsRef, "donor", id, this.donor.donations, new Donation()).then(snapshot => {
      this.donorService.addListListeners(donationsRef, "donor", id, this.donor.donations, new Donation());
    });

    this.donorService.initializeList(conversationsRef, "donor", id, this.donor.conversations, new DonorConversation()).then(snapshot => {
      this.donorService.addListListeners(conversationsRef, "donor", id, this.donor.conversations, new DonorConversation());
    });

    this.donorService.initializeList(recordsRef, "donor", id, this.donor.records, new DonorRecord()).then(snapshot => {
      this.donorService.addListListeners(recordsRef, "donor",id, this.donor.records, new DonorRecord());
    });

    this.donorService.updateAll();
  }

  sortDonations(compareFunction: (a: Donation, b: Donation) => number): void {
  	if (!this.currentSort || compareFunction != this.currentSort) {
      this.donor.donations.sort(compareFunction);
  	}
  	else {
  		this.donor.donations.reverse();
  	}
  	
  	this.currentSort = compareFunction;
  }
  
  compareDates(a: Donation, b: Donation): number {
  	return a.date > b.date ? 1 : -1;
  }
  
  compareAmounts(a: Donation, b: Donation): number {
  	return a.amount - b.amount;
  }

  switchTab(destination: string) {
    switch (destination) {
      case "donations":
        document
        break;
      case "conversations":
      
        break;
      case "documents":
      
        break;
      default:
        break;
    }
  }

  hasUpdates(): boolean {
    return this.donorService.updates.length > 0;
  }

  update(): void {
    this.donorService.updateAll();
  }
}