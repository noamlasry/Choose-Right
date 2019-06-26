import { Identifiable } from '../../identifiable';
import { User } from 'src/app/login/model/user';

export class DonorConversation implements Identifiable<DonorConversation> {
	id: string;
	donor: string;
	date: string;
	summary: string;
	modifiedBy: string;

	modifiedByUser: User = new User();

	static create(other: DonorConversation, id?: string): DonorConversation {
		var conversation: DonorConversation = new DonorConversation();
		conversation.copy(other);
		
		if (id) {
			conversation.id = id;
		}
		else if (other.id) {
			conversation.id = other.id;
		}

		return conversation;
	}

	copy(other: DonorConversation) {
		this.donor = other.donor;
		this.date = other.date;
		this.summary = other.summary;
		this.modifiedBy = other.modifiedBy;
	}

	copyAll(other: DonorConversation) {
		this.copy(other);
		this.id = other.id;
	}

	equals(other: DonorConversation) {
		return this.id == other.id && this.donor == other.donor && this.date == other.date && this.summary == other.summary;
	}

	make(): DonorConversation {
		return new DonorConversation();
	}

	toJSON() {
		return {
			'donor': this.donor,
			'date': this.date,
			'summary': this.summary,
			'modifiedBy': this.modifiedBy
		  }
	}

	static compareDates(a: DonorConversation, b: DonorConversation): number {
		return a.date > b.date ? 1 : -1;
	}

	static compareSummaries(a: DonorConversation, b: DonorConversation): number {
		return a.summary > b.summary ? 1 : -1;
	}
}