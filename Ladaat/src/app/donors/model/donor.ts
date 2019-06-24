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
import { DonorConversation } from './conversation';
import { DonorRecord } from './record';
import { Identifiable } from 'src/app/identifiable';


export class Donor implements Identifiable<Donor> {
	id: string;
	
	firstName: string = "";
	lastName: string = "";
	telephone: string = "";
	orgName: string = "";
	address: string = "";
	email: string = "";

	donations: Donation[] = [];
	conversations: DonorConversation[] = [];
	records: DonorRecord[] = [];

	modifiedBy: string;

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

		this.modifiedBy = other.modifiedBy;
	}

	/* Copies all fields from other donor to this donor, including the ID */
	copyAll(other: Donor) {
		this.id = other.id;
		this.copy(other);
	}

	equals(other: Donor) {
		return this.id == other.id && this.firstName == other.firstName && this.lastName == other.lastName && this.telephone == other.telephone &&
			this.orgName == other.orgName && this.address == other.address && this.email == other.email;
	}
	toJSON() {
		return {
			'firstName': this.firstName,
			'lastName': this.lastName,
			'telephone': this.telephone,
			'orgName': this.orgName,
			'address': this.address,
			'email': this.email,
			'modifiedBy': this.modifiedBy
		  }
	}
	
	make(): Donor {
		return new Donor();
	}
	
	getTotal(): number {
		var total = 0;

		this.donations.forEach(donation => {
			total += donation.amount;
		});

		return total;
	}

	sort<T>(sortData, compareFunction: (a: T, b: T) => number) {
		if (!sortData.comparator || compareFunction != sortData.comparator) {
			sortData.data.sort(compareFunction);
			sortData.ascending = true;
		}
		else {
			sortData.data.reverse();
			sortData.ascending = !sortData.ascending;
		}

		sortData.comparator = compareFunction;
	}

	donationSorting = {
		'data': this.donations,
		'comparator': Donation.compareDates,
		'ascending': true,
		'current': 'date'
	};

	
	sortDonationsByDate() {
		let result = this.sort<Donation>(this.donationSorting, Donation.compareDates);
		this.donationSorting.current = "date";
	}
	
	sortDonationsByAmount() {
		let result = this.sort<Donation>(this.donationSorting, Donation.compareAmounts);
		this.donationSorting.current = "amount";
	}
	
	conversationSorting = {
		'comparator': DonorConversation.compareDates,
		'ascending': true,
		'current': 'date'
	};

	sortConversationsByDate() {
		let result = this.sort<DonorConversation>(this.conversationSorting, DonorConversation.compareDates);
		this.conversationSorting.current = "date";
	}

	sortConversationsBySummary() {
		let result = this.sort<DonorConversation>(this.conversationSorting, DonorConversation.compareSummaries);
		this.conversationSorting.current = "summary";
	}

	recordSorting = {
		'comparator': DonorRecord.compareDates,
		'ascending': true,
		'current': 'date'
	};

	sortRecordsByDate() {
		let result = this.sort<DonorRecord>(this.recordSorting, DonorRecord.compareDates);
		this.recordSorting.current = "date";
	}

	sortRecordsByName() {
		let result = this.sort<DonorRecord>(this.recordSorting, DonorRecord.compareNames);
		this.recordSorting.current = "name";
	}

	sortRecordsByIncoming() {
		let result = this.sort<DonorRecord>(this.recordSorting, DonorRecord.compareIncoming);
		this.recordSorting.current = "incoming";
	}

	sortRecordsByUrl() {
		let result = this.sort<DonorRecord>(this.recordSorting, DonorRecord.compareUrls);
		this.recordSorting.current = "url";
	}

	static compareOrgNames(a: Donor, b: Donor): number {
		return a.orgName > b.orgName ? 1 : -1;
	}

	static compareFirstNames(a: Donor, b: Donor): number {
		return a.firstName > b.firstName ? 1 : -1;
	}
	
	static compareLastNames(a: Donor, b: Donor): number {
		return a.lastName > b.lastName ? 1 : -1;
	}
	
	static compareAmounts(a: Donor, b: Donor): number {
		return a.getTotal() - b.getTotal();
	}
}
