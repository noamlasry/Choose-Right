import { Identifiable } from 'src/app/identifiable';

export class User implements Identifiable<User>{
    id: string;
    name: string = "";
    email: string = "";
    avatar: string = "";
    firstName: string = "";
    lastName: string = "";

    toJSON() {
        return {
            "name": this.name,
            "email":  this.email,
            "avatar": this.avatar,
            "firstName": this.firstName,
            "lastName": this.lastName
        };
    }
    copy(other: User) {
        this.name = other.name;
        this.email = other.email;
        this.avatar = other.avatar;
        this.firstName = other.firstName;
        this.lastName = other.lastName;
    }
    copyAll(other: User) {
        this.id = other.id;
        this.copy(other);
    }
    equals(other: User) {
        return this.id == other.id && this.name == other.name && this.email == other.email && this.avatar == other.avatar
            && this.firstName == other.firstName && this.lastName == other.lastName;
    }
    make(): User {
        return new User();
    }

    getFullestName() {
		if (this.firstName || this.lastName) {
			return (this.firstName + " " + this.lastName).trim();

		}
		else if (this.name) {
			return this.name;
		}
		else if (this.email) {
			return this.email;
		}
		else {
			return this.id;
		}
	}
}