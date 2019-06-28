import { Identifiable } from 'src/app/identifiable';
import { User } from 'src/app/login/model/user';

export class Member implements Identifiable<Member> {
    id: string;
    firstName: string = "";
    lastName: string = "";
    phone: string = "";
    email: string = "";
    birthdate: string = "";
    notes: string = "";
    modifiedBy: string = "";
    modifiedByUser: User = new User();

    toJSON() {
        return {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "phone": this.phone,
            "email": this.email,
            "birthdate": this.birthdate,
            "notes": this.notes,
            "modifiedBy": this.modifiedBy
        }
    }

    copy(other: Member) {
        this.firstName = other.firstName;
        this.lastName = other.lastName;
        this.phone = other.phone;
        this.email = other.email;
        this.birthdate = other.birthdate;
        this.notes = other.notes;
        this.modifiedBy = other.modifiedBy;
    }

    copyAll(other: Member) {
        this.id = other.id;
        this.copy(other);
    }

    equals(other: Member) {
        return this.id == other.id && this.firstName == other.firstName && this.lastName == other.lastName && this.phone == other.phone
            && this.email == other.email && this.birthdate == other.birthdate && this.notes == other.notes;
    }

    make(): Member {
        return new Member();
    }

    static compareFirstNames(a: Member, b: Member): number {
		return a.firstName > b.firstName ? 1 : -1;
	}
	
	static compareLastNames(a: Member, b: Member): number {
		return a.lastName > b.lastName ? 1 : -1;
    }
    
    static comparePhones(a: Member, b: Member): number {
		return a.phone > b.phone ? 1 : -1;
    }
    
    static compareEmails(a: Member, b: Member): number {
		return a.email > b.email ? 1 : -1;
    }
    
    static compareBirthdates(a: Member, b: Member): number {
		return a.birthdate > b.birthdate ? 1 : -1;
    }
    
    static compareNotes(a: Member, b: Member): number {
		return a.notes > b.notes ? 1 : -1;
	}
}