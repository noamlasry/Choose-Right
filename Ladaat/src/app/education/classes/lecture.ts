export class Lecture {
    id?: string;
    institute: string;
    year: number;
    class: string;
    content: string;
    date: Date;
    lecturerName: string;
    price: number;
    contactName1: string;
    email1: string;
    phone1: string;
    contactName2: string;
    email2: string;
    phone2: string;
    
    
    static create(other: Object, id?: string): Lecture {
		var lecture: Lecture = new Lecture();
		lecture.copy(other as Lecture);

		if (id) {
			lecture.id = id;
		}

		return lecture;
    }
    copy(other: Lecture) {
		this.institute = (other as Lecture).institute;
		this.year = (other as Lecture).year;
		this.class = (other as Lecture).class;
		this.content = (other as Lecture).content;
		this.date = (other as Lecture).date;
    this.lecturerName = (other as Lecture).lecturerName;
    this.price = (other as Lecture).price;
    this.contactName1 = (other as Lecture).contactName1;
    this.email1 = (other as Lecture).email1;
    this.phone1= (other as Lecture).phone1;
    this.contactName2= (other as Lecture).contactName2;
    this.email2= (other as Lecture).email2;
    this.phone2= (other as Lecture).phone2;
        
	}
}
