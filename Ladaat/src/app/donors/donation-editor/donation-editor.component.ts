import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { Donation } from '../donation';
import * as firebase from 'firebase';

@Component({
	selector: 'app-donation',
	templateUrl: './donation-editor.component.html',
	styleUrls: ['./donation-editor.component.css']
})
export class DonationEditorComponent implements OnInit {
	private donationsRef: firebase.database.Reference = firebase.database().ref("donations");

	donor: Donor = new Donor();
	donation: Donation = new Donation();
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("donor");
		this.donation.id = this.route.snapshot.paramMap.get("donation");

		if (!this.donor.id) {
			this.location.back(); //temporary fix;
		}

		if (this.donation.id) {
			this.donationsRef.child(this.donation.id).once("value", donation => {
				this.donation.copy(donation.toJSON() as Donation);
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
				this.donationsRef.child(this.donation.id).update(this.donation.toJSON(), () => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
			else {
				var ref = this.donationsRef.push(this.donation.toJSON(), () => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
		}
	}

	delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.donationsRef.child(this.donation.id).remove(() => {
				this.router.navigate(['/donor/' + this.donor.id]);
			});
		}
	}
}
