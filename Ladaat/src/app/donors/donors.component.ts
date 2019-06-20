import { Component, OnInit } from '@angular/core';

import { Donor } from './donor';
import * as firebase from 'firebase';
import { Donation } from './donation';
import { UpdaterService } from '../updater.service';

@Component({
	selector: 'app-donors',
	templateUrl: './donors.component.html',
	styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
	donorRef: firebase.database.Reference = firebase.database().ref("donors");
	donationsRef: firebase.database.Reference = firebase.database().ref("donations");

	donorData: Donor[] = [];
	currentSort: (a: Donor, b: Donor) => number;
	sortField: string = "lastName";
	
	constructor(
		private updateService: UpdaterService
	) {}
	
	ngOnInit() {
		this.updateService.initializeAndListenAll<Donor>(this.donorRef, this.donorData, new Donor())
		.then(snapshot => {
			this.donorData.forEach(donor => {
				this.updateService.initializeAndListenList<Donation>(this.donationsRef, "donor", donor.id, donor.donations, new Donation());
			});
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
	
	compareAmounts(a: Donor, b: Donor): number {
		return a.getTotal() - b.getTotal();
	}

	hasUpdates(): boolean {
		return this.updateService.updates.length > 0;
	}

	update(): void {
		this.updateService.updateAll();
	}
}
