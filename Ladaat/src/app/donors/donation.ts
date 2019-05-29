export class Donation {
	static create(other: Object, id?: string): Donation {
		var donation: Donation = new Donation();

		donation.donor = (other as Donation).donor;
		donation.date = (other as Donation).date;
		donation.amount = (other as Donation).amount;
		
		if (id) {
			donation.id = id;
		}
		else if ((other as Donation).id) {
			donation.id = (other as Donation).id;
		}

		return donation;
	}

	id: string;
	donor: string;
	date: string;
	amount: number;
}
