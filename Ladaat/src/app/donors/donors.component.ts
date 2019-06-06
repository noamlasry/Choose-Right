import { Component, OnInit } from '@angular/core';

import { Donor } from './donor';
import { DonorsService } from './donors.service';

@Component({
	selector: 'app-donors',
	templateUrl: './donors.component.html',
	styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
	donorData: Donor[];
	currentSort: (a: Donor, b: Donor) => number;
	
	constructor(
		private donorsService: DonorsService
		) {}
		
		ngOnInit() {
			this.donorsService.getDonors(donors => {
				this.donorData = donors;
				this.sortDonors(this.compareLastNames);
		});
	}
	
	sortDonors(compareFunction: (a: Donor, b: Donor) => number): void {
		if (!this.currentSort || compareFunction != this.currentSort) {
			this.donorData.sort(compareFunction);
		}
		else {
			this.donorData.reverse();
		}
		
		this.currentSort = compareFunction;
	}
	
	compareOrgNames(a: Donor, b: Donor): number {
		return a.orgName > b.orgName ? 1 : -1;
	}

	compareFirstNames(a: Donor, b: Donor): number {
		return a.firstName > b.firstName ? 1 : -1;
	}
	
	compareLastNames(a: Donor, b: Donor): number {
		return a.lastName > b.lastName ? 1 : -1;
	}
	
	comparePhoneNumbers(a: Donor, b: Donor): number {
		return a.telephone > b.telephone ? 1 : -1;
	}
	
	compareAmounts(a: Donor, b: Donor): number {
		return a.total - b.total;
	}
}
