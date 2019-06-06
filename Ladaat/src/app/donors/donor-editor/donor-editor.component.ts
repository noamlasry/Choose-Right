import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { DonorsService } from '../donors.service';

@Component({
	selector: 'app-donor-editor',
	templateUrl: './donor-editor.component.html',
	styleUrls: ['./donor-editor.component.css']
})
export class DonorEditorComponent implements OnInit {
	donor: Donor;
	temp: Donor = new Donor();;
	update: boolean;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private donorsService: DonorsService,
		private location: Location
	) {}

	ngOnInit(): void {
		if (this.route.snapshot.paramMap.get('id')) {
			this.update = true;
			const id = this.route.snapshot.paramMap.get('id');
			
			this.donorsService.getDonor(id, donor => {
				this.donor = donor;
				this.temp.copyAll(this.donor);
			});
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
			this.donor.copy(this.temp);
			
			if (this.update) {
				this.donorsService.updateDonor(this.donor, () => this.location.back());
			}
			else {
				this.donorsService.addDonor(this.temp, () => this.location.back());
			}
		}
	}

	delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.donorsService.deleteDonor(this.donor, () => this.router.navigate(['donors']));
		}
	}
}
