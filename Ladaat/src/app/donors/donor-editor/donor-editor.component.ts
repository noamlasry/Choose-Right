import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../model/donor';
import * as firebase from 'firebase';
import { UpdaterService } from '../../updater.service';

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

	donor: Donor = new Donor();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private donorService: UpdaterService,
		private location: Location
	) {}

	ngOnInit(): void {
		
		this.donor.id = this.route.snapshot.paramMap.get("id");
		
		if (this.donor.id) {
			this.donorService.initializeSingle(this.donorsRef, this.donor.id, this.donor, new Donor())
			.then(snapshot => this.donorService.addSingleListener(this.donorsRef, this.donor.id, this.donor, new Donor()));

			// this.donorsRef.child(this.donor.id).once("value", donor => {
			// 	this.donor.copy(donor.toJSON() as Donor);
			// });
		}
	}
	
	save(): void {
		if (!this.donor.firstName || !this.donor.lastName) {
			return;
		}
		else {
			this.donor.copy(this.donor);
			
			if (this.donor.id) {
				this.donorsRef.child(this.donor.id).update(this.donor.toJSON(), () => this.location.back());
			}
			else {
				this.donorsRef.push(this.donor.toJSON(), () => this.location.back());
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
					
					// this.donationsRef.orderByChild("donor").equalTo(this.donor.id).off(); //Is this needed?
					this.router.navigate(['donors'])
				});

				this.conversationsRef.orderByChild("donor").equalTo(this.donor.id).once("value", conversations => {
					conversations.forEach(conversation => {
						this.conversationsRef.child(conversation.key).remove();
					});
					
					// this.donationsRef.orderByChild("donor").equalTo(this.donor.id).off(); //Is this needed?
					this.router.navigate(['donors'])
				});

				this.recordssRef.orderByChild("donor").equalTo(this.donor.id).once("value", records => {
					records.forEach(record => {
						this.recordssRef.child(record.key).remove();
					});
					
					// this.donationsRef.orderByChild("donor").equalTo(this.donor.id).off(); //Is this needed?
					this.router.navigate(['donors'])
				});
			});
		}
	}

	hasUpdates(): boolean {
		return this.donorService.hasUpdates();
		}
	
		update(): void {
		this.donorService.updateAll();
		}
}
