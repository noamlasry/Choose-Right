import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../model/donor';
import { DonorConversation } from '../model/conversation';
import * as firebase from 'firebase';
import { Updater } from '../../updater';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-conversation-editor',
  templateUrl: './conversation-editor.component.html',
  styleUrls: ['./conversation-editor.component.css']
})
export class ConversationEditorComponent implements OnInit {
	private conversationsRef: firebase.database.Reference = firebase.database().ref("donor-conversations");
	private usersRef: firebase.database.Reference = firebase.database().ref("users");

	donor: Donor = new Donor();
	conversation: DonorConversation = new DonorConversation();
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private updaterService: Updater,
		private userAuth: AngularFireAuth,
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("donor");
		this.conversation.id = this.route.snapshot.paramMap.get("conversation");
		
		if (!this.donor.id) {
			this.location.back(); //temporary fix;
		}
		
		if (this.conversation.id) {
			this.updaterService.initializeAndListenSingle(this.conversationsRef, this.conversation.id, this.conversation, new DonorConversation())
			.then(snapshot => {
				if (this.conversation.modifiedBy) {
					this.conversation.modifiedByUser.id = this.conversation.modifiedBy;
					this.updaterService.initializeSingle(this.usersRef, this.conversation.modifiedBy, this.conversation.modifiedByUser, this.conversation.modifiedByUser);
				}
			});
		}
	}

	save(): void {		
		if (!this.conversation.date || !this.conversation.summary) {
			return;
		}
		else {
			this.conversation.donor = this.donor.id;
			this.conversation.modifiedBy = this.userAuth.auth.currentUser.uid;
			
			if (this.conversation.id) {
				this.conversationsRef.child(this.conversation.id).update(this.conversation.toJSON())
				.then(() => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
			else {
				let ref = this.conversationsRef.push(this.conversation.toJSON());
				ref.then(() => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
		}
	}

	delete() {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.conversationsRef.child(this.conversation.id).remove(() => {
				this.router.navigate(['/donor/' + this.donor.id]);
			});
		}
	}

	hasUpdates(): boolean {
		return this.updaterService.hasUpdates();
	}

	update(): void {
		this.updaterService.updateAll();
		
		if (this.conversation.modifiedBy) {
			this.conversation.modifiedByUser.id = this.conversation.modifiedBy;
			this.updaterService.initializeSingle(this.usersRef, this.conversation.modifiedBy, this.conversation.modifiedByUser, this.conversation.modifiedByUser);
		}
	}
}