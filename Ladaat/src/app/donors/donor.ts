import { Donation } from './donation';

export class Donor {
	id: string;
	firstName: string;
	lastName: string;
	telephone: string;
	age: number;
}

export class ComplexDonor {
	donor: Donor;
	donations: Donation[];
	total: number;
}
