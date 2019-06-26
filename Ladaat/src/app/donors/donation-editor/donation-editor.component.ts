import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../model/donor';
import { Donation } from '../model/donation';
import * as firebase from 'firebase';
import { UpdaterService } from '../../updater.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
	selector: 'app-donation',
	templateUrl: './donation-editor.component.html',
	styleUrls: ['./donation-editor.component.css']
})
export class DonationEditorComponent implements OnInit {
	private donationsRef: firebase.database.Reference = firebase.database().ref("donations");
	private usersRef: firebase.database.Reference = firebase.database().ref("users");

	donor: Donor = new Donor();
	donation: Donation = new Donation();
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private updaterService: UpdaterService,
		private userAuth: AngularFireAuth,
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("donor");
		this.donation.id = this.route.snapshot.paramMap.get("donation");
		
		
		if (!this.donor.id) {
			this.location.back(); //temporary fix;
		}
		
		if (this.donation.id) {
			this.updaterService.initializeAndListenSingle(this.donationsRef, this.donation.id, this.donation, new Donation())
			.then(snapshot => {
				if (this.donation.modifiedBy) {
					this.donation.modifiedByUser.id = this.donation.modifiedBy;
					this.updaterService.initializeSingle(this.usersRef, this.donation.modifiedBy, this.donation.modifiedByUser, this.donation.modifiedByUser);
				}
			});
		}
	}

	save(): void {		
		if (!this.donation.date || !this.donation.amount) {
			return;
		}
		else {
			this.donation.donor = this.donor.id;

			this.donation.modifiedBy = this.userAuth.auth.currentUser.uid;

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

	hasUpdates(): boolean {
		return this.updaterService.hasUpdates();
	}

	update(): void {
		this.updaterService.updateAll();

		if (this.donation.modifiedBy) {
			this.donation.modifiedByUser.id = this.donation.modifiedBy;
			this.updaterService.initializeSingle(this.usersRef, this.donation.modifiedBy, this.donation.modifiedByUser, this.donation.modifiedByUser);
		}
	}
}