import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { Donation } from '../donation';
import { DonorsService } from '../donors.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['../../shared.css', '../donors/donors.component.css', './donor.component.css']
})
export class DonorComponent implements OnInit {

  donor: Donor;
  donations: Donation[];
  currentSort: (a: Donation, b: Donation) => number;
  
  constructor(
    private route: ActivatedRoute,
    private donorsService: DonorsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.currentSort = this.compareDates;
    this.getDonor();
    this.getDonations();
  }
  
  getDonor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.donorsService.getDonor(id)
      .subscribe(donor => this.donor = donor);
  }
  
  getDonations(): void {
  	this.donorsService.getDonations(this.donor)
      .subscribe(donations => this.donations = donations);
  	this.donations.sort(this.currentSort);
  }
  
  totalDonations(): number {
  	return this.donorsService.totalDonations(this.donor);
  }
  
  sortDonations(compareFunction: (a: Donation, b: Donation) => number): void {
  	if (!this.currentSort || compareFunction != this.currentSort) {
	  	this.donations.sort(compareFunction);
  	}
  	else {
  		this.donations.reverse();
  	}
  	
  	this.currentSort = compareFunction;
  }
  
  compareDates(a: Donation, b: Donation): number {
  	return a.date > b.date ? 1 : -1;
  }
  
  compareAmounts(a: Donation, b: Donation): number {
  	return a.amount > b.amount ? 1 : -1;
  }
}

