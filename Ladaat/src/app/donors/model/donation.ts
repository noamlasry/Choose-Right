import { Identifiable } from 'src/app/identifiable';
import { User } from 'src/app/login/model/user';


export class Donation implements Identifiable<Donation> {
	id: string;
	donor: string;
	date: string;
	amount: number;
	modifiedBy: string;

	modifiedByUser: User = new User();
	
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
		this.modifiedBy = other.modifiedBy;
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
			'amount': this.amount,
			'modifiedBy': this.modifiedBy
		  }
	}

	static compareDates(a: Donation, b: Donation): number {
		return a.date > b.date ? 1 : -1;
	}
	
	static compareAmounts(a: Donation, b: Donation): number {
		return a.amount - b.amount;
	}
}