import { Identifiable } from 'src/app/identifiable';


export class DonorRecord implements Identifiable<DonorRecord> {
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
		this.modifiedBy = other.modifiedBy;
	}

	copyAll(other: DonorRecord) {
		this.copy(other);
		this.id = other.id;
	}

	equals(other: DonorRecord) {
		return this.id == other.id && this.donor == other.donor && this.date == other.date && this.name == other.name && this.url == other.url && this.incoming == other.incoming;
	}

	make(): DonorRecord {
		return new DonorRecord();
	}
	
	toJSON() {
		return {
			'donor': this.donor,
			'date': this.date,
			'name': this.name,
			'url': this.url,
			'incoming':  this.incoming,
			'modifiedBy': this.modifiedBy
		  }
	}

	static compareDates(a: DonorRecord, b: DonorRecord): number {
		return a.date > b.date ? 1 : -1;
	}

	static compareNames(a: DonorRecord, b: DonorRecord): number {
		return a.name > b.name ? 1 : -1;
	}

	static compareUrls(a: DonorRecord, b: DonorRecord): number {
		return a.url > b.url ? 1 : -1;
	}

	static compareIncoming(a: DonorRecord, b: DonorRecord): number {
		return a.incoming > b.incoming ? 1 : -1;
	}

	id: string;
	donor: string;
	date: string;
	name: string;
	url: string;
	incoming: boolean = false;
	modifiedBy: string;
}
