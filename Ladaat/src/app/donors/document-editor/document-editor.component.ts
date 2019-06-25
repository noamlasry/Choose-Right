import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../model/donor';
import { DonorRecord } from '../model/record';
import * as firebase from 'firebase';
import { UpdaterService } from '../../updater.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css']
})
export class DocumentEditorComponent implements OnInit {
  private recordsRef: firebase.database.Reference = firebase.database().ref("donor-records");

	donor: Donor = new Donor();
	record: DonorRecord = new DonorRecord();
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private donorService: UpdaterService,
		private userAuth: AngularFireAuth,
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("donor");
		this.record.id = this.route.snapshot.paramMap.get("record");
		
		
		if (!this.donor.id) {
			this.location.back(); //temporary fix;
		}
		
		if (this.record.id) {
			this.donorService.initializeSingle(this.recordsRef, this.record.id, this.record, new DonorRecord())
			.then(snapshot => this.donorService.addSingleListener(this.recordsRef, this.record.id, this.record, new DonorRecord()));
		}
	}

	save(): void {		
		if (!this.record.date || !this.record.url) {
			return;
		}
		else {
			this.record.donor = this.donor.id;

			this.record.modifiedBy = this.userAuth.auth.currentUser.uid;

			if (this.record.id) {
				this.recordsRef.child(this.record.id).update(this.record.toJSON(), () => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
			else {
				var ref = this.recordsRef.push(this.record.toJSON(), () => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
		}
	}

	delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.recordsRef.child(this.record.id).remove(() => {
				this.router.navigate(['/donor/' + this.donor.id]);
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