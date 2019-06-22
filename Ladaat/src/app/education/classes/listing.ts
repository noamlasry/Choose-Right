export class Listing {
    id?: string;
    lectureId: string;
    subject: string;
    status: string;
    date: string;
    link: string;

    static create(other: Object, id?: string): Listing {
		var lisiting: Listing = new Listing();
		lisiting.copy(other as Listing);

		if (id) {
			lisiting.id = id;
		}

		return lisiting;
    }
    copy(other: Listing) {
		this.lectureId = (other as Listing).lectureId;
		this.link = (other as Listing).link;
        this.status = (other as Listing).status;
		this.subject = (other as Listing).subject;
		this.date = (other as Listing).date;
	}
}
