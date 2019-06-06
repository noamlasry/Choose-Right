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
	static create(other: Object, id?: string): Donor {
		var donor: Donor = new Donor();
		donor.copy(other as Donor);

		if (id) {
			donor.id = id;
		}

		return donor;
	}

	/* Copies all fields from other donor to this donor, except the ID */
	copy(other: Donor) {
		this.firstName = (other as Donor).firstName;
		this.lastName = (other as Donor).lastName;
		this.telephone = (other as Donor).telephone;
		
		this.orgName = (other as Donor).orgName;
		this.address = (other as Donor).address;
		this.email = (other as Donor).email;
	}

	/* Copies all fields from other donor to this donor, including the ID */
	copyAll(other: Donor) {
		this.id = (other as Donor).id;
		this.copy(other);
	}

	id: string;
	
	firstName: string = "";
	lastName: string = "";
	telephone: string = "";
	orgName: string = "";
	address: string = "";
	email: string = "";

	donations: Donation[];
	total: number;
}
