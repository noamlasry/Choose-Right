export class DonorConversation {
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
	}

	copyAll(other: DonorConversation) {
		this.copy(other);
		this.id = other.id;
	}

	toJSON() {
		return {
			'donor': this.donor,
			'date': this.date,
			'summary': this.summary
		  }
	}
	id: string;
	donor: string;
	date: string;
	summary: string;
}