import { Donation } from './donation';

export class Donor {
	static create(other: Object, id?: string): Donor {
		var donor: Donor = new Donor();
		
		donor.firstName = (other as Donor).firstName;
		donor.lastName = (other as Donor).lastName;
		donor.telephone = (other as Donor).telephone;
		donor.age = (other as Donor).age;
		
		if (id) {
			donor.id = id;
		}
		else if ((other as Donor).id) {
			donor.id = (other as Donor).id;
		}

		return donor;
	}

	id: string;
	firstName: string = "";
	lastName: string = "";
	telephone: string = "";
	age: number = 0;
}

export class ComplexDonor {
	donor: Donor;
	donations: Donation[];
	total: number;
}
