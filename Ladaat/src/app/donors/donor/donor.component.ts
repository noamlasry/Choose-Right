import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComplexDonor } from '../donor';
import { Donation } from '../donation';
import { DonorsService } from '../donors.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['../../../shared.css', '../donors.component.css', './donor.component.css']
})
export class DonorComponent implements OnInit {
  complexDonor: ComplexDonor;

  currentSort: (a: Donation, b: Donation) => number;
  
  constructor(
    private route: ActivatedRoute,
    private donorsService: DonorsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.donorsService.getComplexDonor(id, complexDonor => {
      this.complexDonor = complexDonor;
      this.sortDonations(this.compareDates);
    });
  }
  
  sortDonations(compareFunction: (a: Donation, b: Donation) => number): void {
  	if (!this.currentSort || compareFunction != this.currentSort) {
      this.complexDonor.donations.sort(compareFunction);
  	}
  	else {
  		this.complexDonor.donations.reverse();
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