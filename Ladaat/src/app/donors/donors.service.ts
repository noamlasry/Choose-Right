import { Injectable } from '@angular/core';

import { Donor, ComplexDonor } from './donor';
import { Donation } from './donation';

import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class DonorsService {
	db: firebase.database.Database;
	donorRef: firebase.database.Reference;
	donationRef: firebase.database.Reference;

	constructor() {
		this.db = firebase.database();
		this.donorRef = this.db.ref("donors");
		this.donationRef = this.db.ref("donations");
	}
	
	getDonors(callback: (donors: Donor[]) => void): void {
		this.donorRef.once('value').then(snapshot => {
			var donors: Donor[] = [];
			snapshot.forEach(element => {
				var donor = element.toJSON() as Donor;
				donor.id = element.key;
				donors.push(donor);
			});

			callback(donors);
		});
	}

	getComplexDonors(callback: (donors: ComplexDonor[]) => void): void {
		this.donorRef.once('value').then(donorSnapshot => {
			var donors: ComplexDonor[] = [];
			donorSnapshot.forEach(element => {
				var donor = element.toJSON() as Donor;
				donor.id = element.key;
				this.getComplexDonor(donor.id, complexDonor => {
					donors.push(complexDonor)

					if (donors.length == donorSnapshot.numChildren()) {
						callback(donors);
					}
				})
			});
		});
	}
	
	getDonor(id: string, callback: (donor: Donor) => void): void {
		this.donorRef.child(id).once('value').then(snapshot => {
			var donor: Donor = snapshot.toJSON() as Donor;
			donor.id = id;
			callback(donor);
		});
	}
	
	getComplexDonor(id: string, callback: (complexDonor: ComplexDonor) => void): void {
		this.donorRef.child(id).once('value').then(snapshot => {
			var dono: Donor = snapshot.toJSON() as Donor;
			dono.id = id;

			this.getDonations(dono, dona => {
				var tota: number = 0;
				dona.forEach(d => tota += d.amount);
				var complexDonor: ComplexDonor = {donor: dono, donations: dona, total: tota} as ComplexDonor;

				callback(complexDonor);
			});
		});
	}

	addDonor(donor: Donor, callback: (donor: Donor) => void): void {
		var ref = this.donorRef.push({
			'firstName': donor.firstName,
			'lastName': donor.lastName,
			'age': donor.age,
			'telephone': donor.telephone
		});
		
		ref.then(d => {
			donor.id = ref.key;
			callback(donor);
		});
	}
	
	updateDonor(donor: Donor, callback: (donor: Donor) => void): void {
		var ref = this.donorRef.child(donor.id);

		ref.set({
			'firstName': donor.firstName,
			'lastName': donor.lastName,
			'age': donor.age,
			'telephone': donor.telephone
		}).then(d => {
			callback(donor);
		});
	}
	
	addDonation(donor: Donor, date: string, amount: number, callback: (donation: Donation) => void): void {
		
		var donation = new Donation();
		donation.donor = donor.id;
		donation.date = date;
		donation.amount = amount;
		
		var ref = this.donationRef.push({
			'donor': donation.donor,
			'date': donation.date,
			'amount': donation.amount
		});
		ref.then(d => {
			callback(donation);
		});
	}
	
	getDonations(donor: Donor, callback: (donations: Donation[]) => void): void {
		this.donationRef.once('value').then(snapshot => {
			var donations: Donation[] = [];

			snapshot.forEach(element => {
				var donation = element.toJSON() as Donation;
				if (donation.donor == donor.id) {
					donations.push(donation);
				}
			});

			callback(donations);
		});
	}
}
