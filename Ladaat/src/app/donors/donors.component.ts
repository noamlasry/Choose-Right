import { Component, OnInit } from '@angular/core';

import { ComplexDonor } from './donor';
import { DonorsService } from './donors.service';

@Component({
	selector: 'app-donors',
	templateUrl: './donors.component.html',
	styleUrls: ['../../shared.css', './donors.component.css']
})
export class DonorsComponent implements OnInit {
	donorData: ComplexDonor[];
	currentSort: (a: ComplexDonor, b: ComplexDonor) => number;
	
	constructor(
		private donorsService: DonorsService
		) {}
		
		ngOnInit() {
			this.donorsService.getComplexDonors(donors => {
				this.donorData = donors;
				this.sortDonors(this.compareAges);
		});
	}
	
	sortDonors(compareFunction: (a: ComplexDonor, b: ComplexDonor) => number): void {
		if (!this.currentSort || compareFunction != this.currentSort) {
			this.donorData.sort(compareFunction);
		}
		else {
			this.donorData.reverse();
		}
		
		this.currentSort = compareFunction;
	}
	
	compareFirstNames(a: ComplexDonor, b: ComplexDonor): number {
		return a.donor.firstName > b.donor.firstName ? 1 : -1;
	}
	
	compareLastNames(a: ComplexDonor, b: ComplexDonor): number {
		return a.donor.lastName > b.donor.lastName ? 1 : -1;
	}
	
	compareAges(a: ComplexDonor, b: ComplexDonor): number {
		return a.donor.age - b.donor.age;
	}
	
	comparePhoneNumbers(a: ComplexDonor, b: ComplexDonor): number {
		return a.donor.telephone > b.donor.telephone ? 1 : -1;
	}
	
	compareAmounts(a: ComplexDonor, b: ComplexDonor): number {
		return a.total - b.total;
	}
}
