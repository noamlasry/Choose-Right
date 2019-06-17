import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Donor } from '../donor';
import { DonorConversation } from '../conversation';
import * as firebase from 'firebase';

@Component({
  selector: 'app-conversation-editor',
  templateUrl: './conversation-editor.component.html',
  styleUrls: ['./conversation-editor.component.css']
})
export class ConversationEditorComponent implements OnInit {
  private conversationsRef: firebase.database.Reference = firebase.database().ref("donor-conversations");

	donor: Donor = new Donor();
	conversation: DonorConversation = new DonorConversation();
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.donor.id = this.route.snapshot.paramMap.get("donor");
		this.conversation.id = this.route.snapshot.paramMap.get("conversation");

		if (!this.donor.id) {
			this.location.back(); //temporary fix;
		}

		if (this.conversation.id) {
			this.conversationsRef.child(this.conversation.id).once("value", record => {
				this.conversation.copy(record.toJSON() as DonorConversation);
			});
		}
	}

	save(): void {		
		if (!this.conversation.date || !this.conversation.summary) {
			return;
		}
		else {
			this.conversation.donor = this.donor.id;

			if (this.conversation.id) {
				this.conversationsRef.child(this.conversation.id).update(this.conversation.toJSON(), () => {
					this.router.navigate(['/donor/' + this.donor.id]);
				});
			}
			else {
				var ref = this.conversationsRef.push(this.conversation.toJSON(), () => {
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
}
