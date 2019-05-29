import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { DonorsService } from '../donors.service';
import { Donation } from '../donation';

@Component({
	selector: 'app-donation',
	templateUrl: './donation-editor.component.html',
	styleUrls: ['../../../shared.css', './donation-editor.component.css']
})
export class DonationEditorComponent implements OnInit {
	donor: Donor = new Donor();
	donation: Donation = new Donation();
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private donorsService: DonorsService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getDonor();
		this.getDonation();
	}

	
	private getDonor(): void {
		if (this.route.snapshot.paramMap.get('donor')) {
			this.donorsService.getDonor(this.route.snapshot.paramMap.get('donor'), donor => {
				this.donor = donor;
			});
		}
		else {
			this.location.back(); //temporary fix;
		}
	}

	private getDonation(): void {
		if (this.route.snapshot.paramMap.get('donation')) {
			this.donorsService.getDonation(this.route.snapshot.paramMap.get('donation'), donation => {
				this.donation.id = donation.id;
				this.donation.donor = donation.donor;
				this.donation.amount = donation.amount;
				this.donation.date = donation.date;
			});
		}
	}
	
	save(): void {		
		if (!this.donation.date || !this.donation.amount) {
			return;
		}
		else {
			this.donation.donor = this.donor.id;

			if (this.donation.id) {
				this.donorsService.updateDonation(this.donation, () => this.router.navigate(['/donor/' + this.donor.id]));
			}
			else {
				this.donorsService.addDonation(this.donation, () => this.router.navigate(['/donor/' + this.donor.id]));
			}
		}
	}

	delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.donorsService.deleteDonation(this.donation, () => this.router.navigate(['/donor/' + this.donor.id]));
		}
	}
}
