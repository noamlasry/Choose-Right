import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Donor } from './donor';
import { Donation } from './donation';
import { DONORS } from './mock-donors';
import { DONATIONS } from './mock-donors';

@Injectable({
	providedIn: 'root'
})
export class DonorsService {

	constructor() { }
	
	getDonors(): Observable<Donor[]> {
		return of(DONORS);
	}
	
	getDonor(id: number): Observable<Donor> {
		return of(DONORS.find(donor => donor.id === id));
	}
	
	addDonor(donor: Donor): Observable<Donor> {
		donor.id = DONORS.length + 1;
		DONORS.push(donor);
		return of(donor);
	}
	
	updateDonor(donor: Donor): Observable<Donor> {
		return of(donor);
	}
	
	addDonation(donor: Donor, date: string, amount: number): Observable<Donation> {
		var d = new Donation();
		d.donor = donor.id;
		d.date = date;
		d.amount = amount;
		
		DONATIONS.push(d);
		return of(d);
	}
	
	getDonations(donor: Donor): Observable<Donation[]> {
		return of(DONATIONS.filter(d => d.donor == donor.id));
	}
	
	totalDonations(donor: Donor): number {
		var total = 0;
		var donations;
		this.getDonations(donor)
			.subscribe(d => donations = d);
		
		for (var donation of donations) {
			total += donation.amount;
		}
		
		return total;
	}
}
