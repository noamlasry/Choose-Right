import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Updater } from 'src/app/updater';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../model/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private eventsRef: firebase.database.Reference = firebase.database().ref("events");
  private usersRef: firebase.database.Reference = firebase.database().ref("users");

  event: Event = new Event();

  constructor(
    private updaterService: Updater,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    this.updaterService.initializeAndListenSingle(this.eventsRef, id, this.event, new Event())
    .then(() => this.updaterService.updateAll())
    .then(() => {
      if (this.event.modifiedBy) {
        this.event.modifiedByUser.id = this.event.modifiedBy;
        this.updaterService.initializeSingle(this.usersRef, this.event.modifiedBy, this.event.modifiedByUser, this.event.modifiedByUser);
      }
    });
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
