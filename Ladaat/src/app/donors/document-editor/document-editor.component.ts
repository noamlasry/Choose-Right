import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { DonorRecord } from '../record';
import * as firebase from 'firebase';

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
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("donor");
		this.record.id = this.route.snapshot.paramMap.get("record");

		if (!this.donor.id) {
			this.location.back(); //temporary fix;
		}

		if (this.record.id) {
			this.recordsRef.child(this.record.id).once("value", record => {
				this.record.copy(record.toJSON() as DonorRecord);
			});
		}
	}

	save(): void {		
		if (!this.record.date || !this.record.url) {
			return;
		}
		else {
			this.record.donor = this.donor.id;

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
}
