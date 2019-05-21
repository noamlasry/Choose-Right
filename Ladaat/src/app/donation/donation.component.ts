import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { DonorsService } from '../donors.service';

@Component({
	selector: 'app-donation',
	templateUrl: './donation.component.html',
	styleUrls: ['../../shared.css', './donation.component.css']
})
export class DonationComponent implements OnInit {
	donor: Donor;
	amount: number;
	date: string;
	
	constructor(
		private route: ActivatedRoute,
		private donorsService: DonorsService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getDonor();
	}

	getDonor(): void {
		if (this.route.snapshot.paramMap.get('id')) {
			const id = +this.route.snapshot.paramMap.get('id');
			this.donorsService.getDonor(id)
				.subscribe(donor => this.donor = donor);
		}
		else {
			this.location.back(); //temporary fix;
		}
	}
	
	save(): void {		
		if (!this.date || !this.amount) {
			return;
		}
		else {
			this.donorsService.addDonation(this.donor, this.date, +this.amount)
				.subscribe(() => this.location.back());
		}
	}
}
