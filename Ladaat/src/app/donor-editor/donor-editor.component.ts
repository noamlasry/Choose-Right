import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { DonorsService } from '../donors.service';

@Component({
	selector: 'app-donor-editor',
	templateUrl: './donor-editor.component.html',
	styleUrls: ['../../shared.css', './donor-editor.component.css']
})
export class DonorEditorComponent implements OnInit {
	donor: Donor;
	temp: Donor;
	update: boolean;

	constructor(
		private route: ActivatedRoute,
		private donorsService: DonorsService,
		private location: Location
	) {
		this.temp = new Donor();
	}

	ngOnInit(): void {
		this.getDonor();
		
		this.temp.firstName = this.donor.firstName;
		this.temp.lastName = this.donor.lastName;
		this.temp.telephone = this.donor.telephone;
		this.temp.age = this.donor.age;
	}

	getDonor(): void {
		if (this.route.snapshot.paramMap.get('id')) {
			this.update = true;
			const id = +this.route.snapshot.paramMap.get('id');
			this.donorsService.getDonor(id)
				.subscribe(donor => this.donor = donor);
		}
		else {
			this.update = false;
			this.donor = this.temp;
		}
	}
	
	save(): void {		
		if (!this.temp.firstName || !this.temp.lastName) {
			return;
		}
		else {
			if (!this.temp.telephone) {
				this.temp.telephone = "";
			}
			
			this.donor.firstName = this.temp.firstName.trim();
			this.donor.lastName = this.temp.lastName.trim();
			this.donor.telephone = this.temp.telephone.trim();
			this.donor.age = this.temp.age;
			
			if (this.update) {
				
				this.donorsService.updateDonor(this.donor)
					.subscribe(() => this.location.back());
			}
			else {
				this.donorsService.addDonor(this.temp)
					.subscribe(() => this.location.back());
			}
		}
	}
}
