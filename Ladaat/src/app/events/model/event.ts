import { Identifiable } from 'src/app/identifiable';
import { User } from 'src/app/login/model/user';

export class Event implements Identifiable<Event> {
    id: string;
    date: string = "";
    name: string = "";
    description: string = "";
    location: string = "";
    notes: string = "";
    modifiedBy: string;

    modifiedByUser: User = new User();

    toJSON() {
      return {
        "date": this.date,
        "name": this.name,
        "description": this.description,
        "location": this.location,
        "notes": this.notes,
        'modifiedBy': this.modifiedBy
        }
    }

    copy(other: Event) {
      this.date = other.date;
      this.name = other.name;
      this.description = other.description;
      this.location = other.location;
      this.notes = other.notes;
      this.modifiedBy = other.modifiedBy;
    }
    copyAll(other: Event) {
      this.id = other.id;
      this.copy(other);
    }
    equals(other: Event) {
      return this.id == other.id && this.name == other.name && this.description == other.description && this.date == other.date
          && this.location == other.location && this.notes == other.notes;
    }
    make(): Event {
      return new Event();
    }
    
    static compareDates(a: Event, b: Event): number {
      return a.date > b.date ? 1 : -1;
    }

    static compareNames(a: Event, b: Event): number {
		  return a.name > b.name ? 1 : -1;
    }
    
    static compareDescriptions(a: Event, b: Event): number {
		  return a.description > b.description ? 1 : -1;
    }
    
    static compareLocations(a: Event, b: Event): number {
		  return a.location > b.location ? 1 : -1;
    }
    
    static compareNotes(a: Event, b: Event): number {
		  return a.notes > b.notes ? 1 : -1;
	}
}