import { Component, OnInit } from '@angular/core';
import { Lecture } from "../classes/lecture";
import { EducationService } from "../services/education.service";
import { Listing } from '../classes/listing';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  lecture: Lecture;
  listingsArr: Listing[];
	currentSort: (a: Listing, b: Listing) => number;
	private lectruesRef: firebase.database.Reference = firebase.database().ref("lectures");
	private listingRef: firebase.database.Reference = firebase.database().ref("listings");
  
	
  constructor(
	private router: Router,
    private route: ActivatedRoute,
    private educationService: EducationService
  ) { }

  ngOnInit()
  {
    this.educationService.getLecture(this.route.snapshot.paramMap.get('id'), 
        lecture => { this.lecture = lecture;});
    this.educationService.getListings(listings => {
    this.listingsArr = listings;
    this.sortListings(this.compareDates);
  });
  }
  delete() 
  {

  if (confirm("האם את בטוחה שאת רוצה למחוק?")) 
  {
	this.educationService.getListings(listings => {
	  this.listingsArr = listings;});
	for(let listing of this.listingsArr)
	{
	  if(this.lecture.id == listing.lectureId)
		this.listingRef.child(listing.id).remove();
	}
		  this.lectruesRef.child(this.lecture.id).remove(() => {
			  this.router.navigate(['/education/']);
		  });
	  }
  }
  openLink(url: string) {
    window.open(url, '_blank');
  }
  sortListings(compareFunction: (a: Listing, b: Listing) => number): void {
		if (!this.currentSort || compareFunction != this.currentSort) {
			this.listingsArr.sort(compareFunction);
		}
		else {
			this.listingsArr.reverse();
		}
		
		this.currentSort = compareFunction;
	}
	
	compareStatuses(a: Listing, b: Listing): number {
		return a.status > b.status ? 1 : -1;
	}

	compareSubjects(a: Listing, b: Listing): number {
		return a.subject > b.subject ? 1 : -1;
	}
	
	compareLinks(a: Listing, b: Listing): number {
		return a.link > b.link ? 1 : -1;
	}
	
	compareDates(a: Listing, b: Listing): number {
		return a.date > b.date ? 1 : -1;
	}
	
}
