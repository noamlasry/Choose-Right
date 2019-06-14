/*
Client requirements:
* Organization name
* email address
* mailing address

Also keep:
* Name of contact
* Phone number
*/

import { Donation } from './donation';

export class Donor {
	static create(other: Donor, id?: string): Donor {
		var donor: Donor = new Donor();
		donor.copy(other);

		if (id) {
			donor.id = id;
		}

		return donor;
	}

	/* Copies all fields from other donor to this donor, except the ID */
	copy(other: Donor) {
		this.firstName = other.firstName;
		this.lastName = other.lastName;
		this.telephone = other.telephone;
		
		this.orgName = other.orgName;
		this.address = other.address;
		this.email = other.email;
	}

	/* Copies all fields from other donor to this donor, including the ID */
	copyAll(other: Donor) {
		this.id = other.id;
		this.copy(other);
	}

	toJSON() {
		return {
			'firstName': this.firstName,
			'lastName': this.lastName,
			'telephone': this.telephone,
			'orgName': this.orgName,
			'address': this.address,
			'email': this.email,
		  }
	}
	
	getTotal(): number {
		var total = 0;

		this.donations.forEach(donation => {
			total += donation.amount;
		});

		return total;
	}


	id: string;
	
	firstName: string = "";
	lastName: string = "";
	telephone: string = "";
	orgName: string = "";
	address: string = "";
	email: string = "";

	donations: Donation[] = [];
}
