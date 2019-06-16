export class DonorRecord {
	static create(other: DonorRecord, id?: string): DonorRecord {
		var record: DonorRecord = new DonorRecord();
		record.copy(other);
		
		if (id) {
			record.id = id;
		}
		else if (other.id) {
			record.id = other.id;
		}

		return record;
	}

	copy(other: DonorRecord) {
		this.donor = other.donor;
		this.date = other.date;
		this.name = other.name;
		this.url = other.url;
		this.incoming = other.incoming;
	}

	copyAll(other: DonorRecord) {
		this.copy(other);
		this.id = other.id;
	}

	toJSON() {
		return {
			'donor': this.donor,
			'date': this.date,
			'name': this.name,
			'url': this.url,
			'incoming':  this.incoming
		  }
	}
	id: string;
	donor: string;
	date: string;
	name: string;
	url: string;
	incoming: boolean = false;
}
