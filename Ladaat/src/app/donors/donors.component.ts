import { Component, OnInit } from '@angular/core';

import { Donor } from './donor';
import * as firebase from 'firebase';
import { Donation } from './donation';

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
	
	constructor() {}
	
	ngOnInit() {

		this.donorRef.orderByChild(this.sortField).once("value", donors => {
			this.donorData = [];

			donors.forEach(dono => {
				var donor = Donor.create(dono.toJSON() as Donor, dono.key);
				this.addDonationUpdaters(donor);
				this.donorData.push(donor);
			});
		});

		this.donorRef.orderByChild(this.sortField).on("child_added", dono => {
			var exists = false;
			var donor = Donor.create(dono.toJSON() as Donor, dono.key)

			this.donorData.forEach(d => {
				if (d.id == donor.id) {
					exists = true;
					return;
				}
			})
			
			if (!exists) {
				this.donorData.push(donor);
				this.addDonationUpdaters(donor);
				this.donorData.sort(this.currentSort);
				console.log("All quiet on the western front");
			}
		});

		this.donorRef.orderByChild(this.sortField).on("child_changed", dono => {
			var donor = Donor.create(dono.toJSON() as Donor, dono.key);

			this.donorData.forEach(d => {
				if (d.id == donor.id) {
					d.copy(donor);
					this.donorData.sort(this.currentSort);
					return;
				}
			})
		});

		this.donorRef.orderByChild(this.sortField).on("child_removed", dono => {
			var donor = Donor.create(dono.toJSON() as Donor, dono.key);

			this.donorData.forEach(d => {
				if (d.id == donor.id) {
					this.donorData.splice(this.donorData.indexOf(d), 1);
					// this.donationsRef.orderByChild("donor").equalTo(donor.id).off(); //Is this needed?
					this.donorData.sort(this.currentSort);
					return;
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
	
	compareAmounts(a: Donor, b: Donor): number {
		return a.getTotal() - b.getTotal();
	}

	private addDonationUpdaters(donor: Donor) {
		this.donationsRef.orderByChild("donor").equalTo(donor.id).on("child_added", dona => {
			var donation = Donation.create(dona.toJSON() as Donation, dona.key);
			donor.donations.push(donation);
			this.donorData.sort(this.currentSort);
		});
		
		this.donationsRef.orderByChild("donor").equalTo(donor.id).on("child_changed", dona => {
			var donation = Donation.create(dona.toJSON() as Donation, dona.key);
			
			donor.donations.forEach(d => {
			  if (d.id == donation.id) {
				d.copy(donation);
				this.donorData.sort(this.currentSort);
				return;
			  }
			});
		});
		  
		this.donationsRef.orderByChild("donor").equalTo(donor.id).on("child_removed", dona => {
			var donation = Donation.create(dona.toJSON() as Donation, dona.key);
			
			donor.donations.forEach(d => {
			  if (d.id == donation.id) {
				donor.donations.splice(donor.donations.indexOf(d), 1);
				this.donorData.sort(this.currentSort);
				return;
			  }
			});
		});
	}
}
