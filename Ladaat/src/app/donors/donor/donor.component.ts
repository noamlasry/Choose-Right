import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Donor } from '../donor';
import { Donation } from '../donation';
import { DonorsService } from '../donors.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  donor: Donor;

  currentSort: (a: Donation, b: Donation) => number;
  
  constructor(
    private route: ActivatedRoute,
    private donorsService: DonorsService
  ) {}

  ngOnInit(): void {
    this.donorsService.getDonor(this.route.snapshot.paramMap.get('id'), donor => {
      this.donor = donor;
      this.sortDonations(this.compareDates);
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