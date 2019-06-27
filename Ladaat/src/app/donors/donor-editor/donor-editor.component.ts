import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../model/donor';
import * as firebase from 'firebase';
import { Updater } from '../../updater';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
	selector: 'app-donor-editor',
	templateUrl: './donor-editor.component.html',
	styleUrls: ['./donor-editor.component.css']
})
export class DonorEditorComponent implements OnInit {
	private donorsRef: firebase.database.Reference = firebase.database().ref("donors");
	private donationsRef: firebase.database.Reference = firebase.database().ref("donations");
	private conversationsRef = firebase.database().ref("donor-conversations");
	private recordssRef = firebase.database().ref("donor-records");
	private usersRef: firebase.database.Reference = firebase.database().ref("users");

	donor: Donor = new Donor();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private updaterService: Updater,
		private userAuth: AngularFireAuth,
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("id");
		
		if (this.donor.id) {
			this.updaterService.initializeAndListenSingle(this.donorsRef, this.donor.id, this.donor, new Donor())
			.then(snapshot => {
				if (this.donor.modifiedBy) {
					this.donor.modifiedByUser.id = this.donor.modifiedBy;
					this.updaterService.initializeSingle(this.usersRef, this.donor.modifiedBy, this.donor.modifiedByUser, this.donor.modifiedByUser);
				}
			});
		}
	}
	
	save(): void {
		if (!this.donor.firstName || !this.donor.lastName) {
			return;
		}
		else {
			this.donor.copy(this.donor);

			this.donor.modifiedBy = this.userAuth.auth.currentUser.uid;
			
			if (this.donor.id) {
				this.donorsRef.child(this.donor.id).update(this.donor.toJSON())
				.then(() => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
			else {
				let ref = this.donorsRef.push(this.donor.toJSON());
				ref.then(() => {
					this.router.navigate(['/donor/' + ref.key]);
				});
			}
		}
	}

	delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.donorsRef.child(this.donor.id).remove(() => {
				this.donationsRef.orderByChild("donor").equalTo(this.donor.id).once("value", donations => {
					donations.forEach(donation => {
						this.donationsRef.child(donation.key).remove();
					});
				});

				this.conversationsRef.orderByChild("donor").equalTo(this.donor.id).once("value", conversations => {
					conversations.forEach(conversation => {
						this.conversationsRef.child(conversation.key).remove();
					});
				});

				this.recordssRef.orderByChild("donor").equalTo(this.donor.id).once("value", records => {
					records.forEach(record => {
						this.recordssRef.child(record.key).remove();
					});
				});
			})
			.then(() => {
				this.router.navigate(['donors']);
			});
		}
	}

	back() {
		if (this.donor.id) {
			this.router.navigate(['/donor/' + this.donor.id]);
		}
		else {
			this.router.navigate(['donors']);
		}
	}
	
	hasUpdates(): boolean {
		return this.updaterService.hasUpdates();
	}

	update(): void {
		this.updaterService.updateAll();

		if (this.donor.modifiedBy) {
			this.donor.modifiedByUser.id = this.donor.modifiedBy;
			this.updaterService.initializeSingle(this.usersRef, this.donor.modifiedBy, this.donor.modifiedByUser, this.donor.modifiedByUser);
		}
	}
}
