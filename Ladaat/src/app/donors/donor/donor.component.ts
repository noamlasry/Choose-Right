import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Donor } from '../donor';
import { Donation } from '../donation';
import * as firebase from 'firebase';

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
    
    donorRef.on("value", donor => {
      if (donor.exists()) {
        this.donor.id = this.route.snapshot.paramMap.get("id");
        this.donor.copy(donor.toJSON() as Donor);
      }
      else {
        this.donor.id = null;
      }
    });

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