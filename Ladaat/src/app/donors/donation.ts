import { Identifiable } from '../identifiable';

export class Donation implements Identifiable<Donation> {
	static create(other: Donation, id?: string): Donation {
		var donation: Donation = new Donation();
		donation.copy(other);
		
		if (id) {
			donation.id = id;
		}
		else if (other.id) {
			donation.id = other.id;
		}

		return donation;
	}

	copy(other: Donation) {
		this.donor = other.donor;
		this.date = other.date;
		this.amount = other.amount;
	}

	copyAll(other: Donation) {
		this.copy(other);
		this.id = other.id;
	}

	equals(other: Donation) {
		return this.id == other.id && this.donor == other.donor && this.date == other.date && this.amount == other.amount;
	}

	make(): Donation {
		return new Donation();
	}
	
	toJSON() {
		return {
			'donor': this.donor,
			'date': this.date,
			'amount': this.amount
		  }
	}
	id: string;
	donor: string;
	date: string;
	amount: number;
}
