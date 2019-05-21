import { Component, OnInit } from '@angular/core';
import { Donor } from '../donor';
import { DonorsService } from '../donors.service';

@Component({
	selector: 'app-donors',
	templateUrl: './donors.component.html',
	styleUrls: ['../../shared.css', './donors.component.css']
})
export class DonorsComponent implements OnInit {
	donors: Donor[];
	currentSort: (a: Donor, b: Donor) => number;
	
	constructor(private donorsService: DonorsService) { }

	ngOnInit() {
		this.currentSort = this.compareAges;
		this.getDonors();
	}
	
	getDonors(): void {
		this.donorsService.getDonors()
				.subscribe(donors => this.donors = donors);
		this.donors.sort(this.currentSort);
	}
	
	totalDonations(donor: Donor): number {
		return this.donorsService.totalDonations(donor);
	}
	
	sortDonors(compareFunction: (a: Donor, b: Donor) => number): void {
		if (!this.currentSort || compareFunction != this.currentSort) {
			this.donors.sort(compareFunction);
		}
		else {
			this.donors.reverse();
		}
		
		this.currentSort = compareFunction;
	}
	
	compareFirstNames(a: Donor, b: Donor): number {
		return a.firstName > b.firstName ? 1 : -1;
	}
	
	compareLastNames(a: Donor, b: Donor): number {
		return a.lastName > b.lastName ? 1 : -1;
	}
	
	compareAges(a: Donor, b: Donor): number {
		return a.age > b.age ? 1 : -1;
	}
	
	comparePhoneNumbers(a: Donor, b: Donor): number {
		return a.telephone > b.telephone ? 1 : -1;
	}
	
	compareAmounts(a: Donor, b: Donor): number {
		return this.totalDonations(a) > this.totalDonations(b) ? 1 : -1;
	}
}
