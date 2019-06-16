import { Component, OnInit } from '@angular/core';

import { Donor } from './donor';
import * as firebase from 'firebase';

@Component({
	selector: 'app-donors',
	templateUrl: './donors.component.html',
	styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
	donorRef: firebase.database.Reference = firebase.database().ref("donors");
	donorData: Donor[] = [];
	currentSort: (a: Donor, b: Donor) => number;
	sortField: string = "lastName";
	
	constructor() {}
		
		ngOnInit() {
			this.donorRef.orderByChild(this.sortField).once("value", donors => {
				this.donorData = [];

				donors.forEach(dono => {
					this.donorData.push(Donor.create(dono.toJSON() as Donor, dono.key));
				});
			});

			this.donorRef.orderByChild(this.sortField).on("child_added", dono => {
				var exists = false;
				var donor = Donor.create(dono.toJSON() as Donor, dono.key)

				this.donorData.forEach(d => {
					if (d.id == donor.id) {
						exists = true;
					}
				})
				
				if (!exists) {
					this.donorData.push(donor);
					this.donorData.sort(this.currentSort);
				}
			});

			this.donorRef.orderByChild(this.sortField).on("child_changed", dono => {
				var donor = Donor.create(dono.toJSON() as Donor, dono.key);

				this.donorData.forEach(d => {
					if (d.id == donor.id) {
						d.copy(donor);
						this.donorData.sort(this.currentSort);
					}
				})
			});

			this.donorRef.orderByChild(this.sortField).on("child_removed", dono => {
				var donor = Donor.create(dono.toJSON() as Donor, dono.key);

				this.donorData.forEach(d => {
					if (d.id == donor.id) {
						this.donorData.splice(this.donorData.indexOf(d), 1);
						this.donorData.sort(this.currentSort);
					}
				})
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
		return a.getTotal() - b.getTotal();
	}
}
