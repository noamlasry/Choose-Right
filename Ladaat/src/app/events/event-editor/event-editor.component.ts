import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Event } from '../model/event';
import { Router, ActivatedRoute } from '@angular/router';
import { Updater } from 'src/app/updater';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {
  private eventsRef: firebase.database.Reference = firebase.database().ref("events");
  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  event: Event = new Event();

  constructor(
    private router: Router,
		private route: ActivatedRoute,
		private updaterService: Updater,
		private userAuth: AngularFireAuth,
		private location: Location
  ) { }

  ngOnInit() {
    this.event.id = this.route.snapshot.paramMap.get("id");
    
    if (this.event.id) {
			this.updaterService.initializeAndListenSingle(this.eventsRef, this.event.id, this.event, new Event())
			.then(() => {
				if (this.event.modifiedBy) {
					this.event.modifiedByUser.id = this.event.modifiedBy;
					this.updaterService.initializeSingle(this.usersRef, this.event.modifiedBy, this.event.modifiedByUser, this.event.modifiedByUser);
				}
			});
		}
  }

  save(): void {		
		if (!this.event.date || !this.event.name) {
			return;
		}
		else {
			this.event.modifiedBy = this.userAuth.auth.currentUser.uid;

			if (this.event.id) {
				this.eventsRef.child(this.event.id).update(this.event.toJSON())
				.then(() => {
					this.router.navigate(['/event/' + this.event.id]);
				});
			}
			else {
				let ref = this.eventsRef.push(this.event.toJSON());
				ref.then(() => {
					this.router.navigate(['/event/' + ref.key]);
				});
			}
		}
  }
  
  delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.eventsRef.child(this.event.id).remove().then(() => {
				this.router.navigate(['events']);
			});
		}
	}

	hasUpdates(): boolean {
		return this.updaterService.hasUpdates();
	}

	update(): void {
		this.updaterService.updateAll();

		if (this.event.modifiedBy) {
			this.event.modifiedByUser.id = this.event.modifiedBy;
			this.updaterService.initializeSingle(this.usersRef, this.event.modifiedBy, this.event.modifiedByUser, this.event.modifiedByUser);
		}
	}
}
