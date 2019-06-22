import { Component, OnInit } from '@angular/core';

import { Donor } from '../model/donor';
import * as firebase from 'firebase';
import { Donation } from '../model/donation';
import { UpdaterService } from 'src/app/updater.service';

@Component({
	selector: 'app-donors',
	templateUrl: './donors.component.html',
	styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
	donorRef: firebase.database.Reference = firebase.database().ref("donors");
	donationsRef: firebase.database.Reference = firebase.database().ref("donations");

	donorData: Donor[] = [];
	
	constructor(
		private updateService: UpdaterService
	) {}
	
	ngOnInit() {
		this.updateService.initializeAndListenAll<Donor>(this.donorRef, this.donorData, new Donor())
		.then(snapshot => {
			this.donorData.forEach(donor => {
				this.updateService.initializeAndListenList<Donation>(this.donationsRef, "donor", donor.id, donor.donations, new Donation());
			});
		}).then(snapshot => {
			this.updateService.updateAll();
			this.donorData.sort(this.donorSorting.comparator);
		});
	}
	
	sort<T>(sortData, compareFunction: (a: T, b: T) => number) {
			if (!sortData.comparator || compareFunction != sortData.comparator) {
				sortData.data.sort(compareFunction);
				sortData.ascending = true;
			}
			else {
				sortData.data.reverse();
				sortData.ascending = !sortData.ascending;
			}

			sortData.comparator = compareFunction;
	}

	donorSorting = {
		'data': this.donorData,
		'comparator': Donor.compareOrgNames,
		'ascending': true,
		'current': 'orgName'
	};

	
	sortDonorsByOrgName() {
		this.sort<Donor>(this.donorSorting, Donor.compareOrgNames);
		this.donorSorting.current = 'orgName';
	}

	sortDonorsByFirstName() {
		this.sort<Donor>(this.donorSorting, Donor.compareFirstNames);
		this.donorSorting.current = 'firstName';
	}

	sortDonorsByLastName() {
		this.sort<Donor>(this.donorSorting, Donor.compareLastNames);
		this.donorSorting.current = 'lastName';
	}

	sortDonorsByAmount() {
		this.sort<Donor>(this.donorSorting, Donor.compareAmounts);
		this.donorSorting.current = 'amount';
	}

	hasUpdates(): boolean {
		return this.updateService.hasUpdates();
	}

	update(): void {
		this.updateService.updateAll();
	}
}
