import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Event } from '../model/event';
import { Updater } from '../../updater';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsRef: firebase.database.Reference = firebase.database().ref("events");

  events: Event[] = [];
  
  constructor(
    private updater: Updater
  ) { }

  ngOnInit() {
    this.updater.initializeAndListenAll<Event>(this.eventsRef, this.events, new Event())
		.then(() => {
			this.updater.updateAll();
			this.events.sort(this.eventSorting.comparator);
		});
  }

  sort<T>(sortData, compareFunction: (a: T, b: T) => number) {
    if (!sortData.comparator || compareFunction != sortData.comparator) {
      sortData.data.sort(compareFunction);
      sortData.ascending = true;
    }
    else {
      sortData.data.reverse();
      sortData.ascending = !sortData.ascending;
    }

    sortData.comparator = compareFunction;
  }

  eventSorting = {
    'data': this.events,
    'comparator': Event.compareDates,
    'ascending': true,
    'current': 'date'
  };

  sortEventsByName() {
    this.sort<Event>(this.eventSorting, Event.compareNames);
    this.eventSorting.current = 'name';
  }
  
  sortEventsByDate() {
    this.sort<Event>(this.eventSorting, Event.compareDates);
    this.eventSorting.current = 'date';
  }

  sortEventsByDescription() {
    this.sort<Event>(this.eventSorting, Event.compareDescriptions);
    this.eventSorting.current = 'description';
  }

  sortEventsByLocation() {
    this.sort<Event>(this.eventSorting, Event.compareLocations);
    this.eventSorting.current = 'location';
  }

  sortEventsByNotes() {
    this.sort<Event>(this.eventSorting, Event.compareNotes);
    this.eventSorting.current = 'notes';
  }

  hasUpdates(): boolean {
    return this.updater.hasUpdates();
  }

  update(): void {
    this.updater.updateAll();
  }
}
