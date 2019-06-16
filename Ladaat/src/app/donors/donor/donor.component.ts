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

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  donor: Donor = new Donor();
  sortField: string = "date";
  
  currentSort: (a: Donation, b: Donation) => number;
  
  constructor(
    private route: ActivatedRoute
    ) {}
    
  ngOnInit(): void {
    
    const donorRef = firebase.database().ref("donors").child(this.route.snapshot.paramMap.get("id"));
    const donationsRef = firebase.database().ref("donations");
    const conversationsRef = firebase.database().ref("donor-conversations");
    const recordssRef = firebase.database().ref("donor-records");
    
    donorRef.on("value", donor => {
      if (donor.exists()) {
        this.donor.id = this.route.snapshot.paramMap.get("id");
        this.donor.copy(donor.toJSON() as Donor);
      }
      else {
        this.donor.id = null;
      }
    });


    // Donations updaters:
    donationsRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_added", dona => {
      var donation = Donation.create(dona.toJSON() as Donation, dona.key);
      this.donor.donations.push(donation);
      this.donor.donations.sort(this.currentSort);
    });
    
    donationsRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_changed", dona => {
      var donation = Donation.create(dona.toJSON() as Donation, dona.key);
      
      this.donor.donations.forEach(d => {
        if (d.id == donation.id) {
          d.copy(donation);
          this.donor.donations.sort(this.currentSort);
          return;
        }
      });
    });
    
    donationsRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_removed", dona => {
      var donation = Donation.create(dona.toJSON() as Donation, dona.key);
      
      this.donor.donations.forEach(d => {
        if (d.id == donation.id) {
          this.donor.donations.splice(this.donor.donations.indexOf(d), 1);
          this.donor.donations.sort(this.currentSort);
          return;
        }
      });
    });

    // Conversation updaters:
    conversationsRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_added", convo => {
      var conversation = DonorConversation.create(convo.toJSON() as DonorConversation, convo.key);
      this.donor.conversations.push(conversation);
      // this.donor.conversations.sort(this.currentSort);
    });
    
    conversationsRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_changed", convo => {
      var conversation = DonorConversation.create(convo.toJSON() as DonorConversation, convo.key);
      
      this.donor.conversations.forEach(c => {
        if (c.id == conversation.id) {
          c.copy(conversation);
          // this.donor.conversations.sort(this.currentSort);
          return;
        }
      });
    });
    
    conversationsRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_removed", convo => {
      var conversation = DonorConversation.create(convo.toJSON() as DonorConversation, convo.key);
      
      this.donor.conversations.forEach(c => {
        if (c.id == conversation.id) {
          this.donor.conversations.splice(this.donor.conversations.indexOf(c), 1);
          // this.donor.conversations.sort(this.currentSort);
          return;
        }
      });
    });


    // Document updaters:
    recordssRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_added", rec => {
      var record = DonorRecord.create(rec.toJSON() as DonorRecord, rec.key);
      this.donor.records.push(record);
      // this.donor.conversations.sort(this.currentSort);
    });
    
    recordssRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_changed", rec => {
      var record = DonorRecord.create(rec.toJSON() as DonorRecord, rec.key);
      
      this.donor.records.forEach(r => {
        if (r.id == record.id) {
          r.copy(record);
          // this.donor.records.sort(this.currentSort);
          return;
        }
      });
    });
    
    recordssRef.orderByChild("donor").equalTo(this.route.snapshot.paramMap.get("id")).on("child_removed", rec => {
      var record = DonorRecord.create(rec.toJSON() as DonorRecord, rec.key);
      
      this.donor.records.forEach(r => {
        if (r.id == record.id) {
          this.donor.records.splice(this.donor.records.indexOf(r), 1);
          // this.donor.records.sort(this.currentSort);
          return;
        }
      });
    });
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
}