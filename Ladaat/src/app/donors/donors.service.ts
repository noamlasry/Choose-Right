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
		this.donorRef.once('value')
		.then(snapshot => {
			var donors: Donor[] = [];
			snapshot.forEach(element => {
				donors.push(Donor.create(element.toJSON(), element.key));
			});

			callback(donors);
		})
		.catch(error => {
			console.log(error);
		});
	}

	getComplexDonors(callback: (donors: ComplexDonor[]) => void): void {
		this.donorRef.once('value')
		.then(donorSnapshot => {
			var donors: ComplexDonor[] = [];
			donorSnapshot.forEach(element => {
				this.getComplexDonor(element.key, complexDonor => {
					donors.push(complexDonor)

					if (donors.length == donorSnapshot.numChildren()) {
						callback(donors);
					}
				})
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	getDonor(id: string, callback: (donor: Donor) => void): void {
		this.donorRef.child(id).once('value')
		.then(snapshot => {
			callback(Donor.create(snapshot.toJSON(), snapshot.key));
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	getComplexDonor(id: string, callback: (complexDonor: ComplexDonor) => void): void {
		this.donorRef.child(id).once('value')
		.then(snapshot => {
			var dono: Donor = Donor.create(snapshot.toJSON(), snapshot.key);

			this.getDonations(dono, dona => {
				var tota: number = 0;
				dona.forEach(d => tota += d.amount);
				var complexDonor: ComplexDonor = {donor: dono, donations: dona, total: tota} as ComplexDonor;

				callback(complexDonor);
			});
		})
		.catch(error => {
			console.log(error);
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
			callback(Donor.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	updateDonor(donor: Donor, callback: (donor: Donor) => void): void {
		var ref = this.donorRef.child(donor.id);

		ref.set({
			'firstName': donor.firstName,
			'lastName': donor.lastName,
			'age': donor.age,
			'telephone': donor.telephone
		})
		.then(d => {
			callback(d);
		})
		.catch(error => {
			console.log(error);
		});
	}

	deleteDonor(donor: Donor, callback: (donor: Donor, donations: Donation[]) => void): void {
		var donations: Donation[] = [];

		this.donorRef.child(donor.id).remove()
		.then(() => {
			this.getDonations(donor, donas => {
				if (donas.length > 0) {
					donas.forEach(donation => {
						this.deleteDonation(donation, d => {
							donations.push(d);
	
							if (donations.length == donas.length) {
								callback(donor, donations);
							}
						})
					});
				}
				else {
					callback(donor, donations);
				}
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	getDonation(id: string, callback: (donation: Donation) => void): void {
		this.donationRef.child(id).once('value')
		.then(snapshot => {
			callback(Donation.create(snapshot.toJSON(), snapshot.key));
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	addDonation(donation: Donation, callback: (donation: Donation) => void): void {
		var ref = this.donationRef.push({
			'donor': donation.donor,
			'date': donation.date,
			'amount': donation.amount
		  })
		  
		ref.then(d => {
			callback(Donation.create(d.toJSON(), ref.key));
		}).catch(error => {
			console.log(error);
		});
	}

	updateDonation(donation: Donation, callback: (donation: Donation) => void): void {
		var ref = this.donationRef.child(donation.id);

		ref.set({
			'donor': donation.donor,
			'date': donation.date,
			'amount': donation.amount
		  })
		.then(() => {
			callback(donation);
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	deleteDonation(donation: Donation, callback: (donation: Donation) => void): void {
		this.db.ref("donations/" + donation.id).remove()
		.then(() => {
			callback(donation);
		})
		.catch(error => {
			console.log(error);
		});
	}

	getDonations(donor: Donor, callback: (donations: Donation[]) => void): void {
		this.donationRef.once('value')
		.then(snapshot => {
			var donations: Donation[] = [];

			snapshot.forEach(element => {
				var donation = Donation.create(element.toJSON(), element.key);
				if (donation.donor == donor.id) {
					donations.push(donation);
				}
			});

			callback(donations);
		})
		.catch(error => {
			console.log(error);
		});
	}
}