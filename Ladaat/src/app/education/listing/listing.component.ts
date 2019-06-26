import { Component, OnInit } from '@angular/core';
import { Listing } from "../classes/listing";
import { EducationService } from '../services/education.service';
import { Location } from '@angular/common';
import { Lecture } from "../classes/lecture"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  id?: string;
  lectureId: string = '';
  subject: string = '';
  status: string = '';
  date: string = '';
  link: string = '';
  
  lecture: Lecture = new Lecture();

constructor(
  private educationService: EducationService,
   private location: Location,
   private route: ActivatedRoute,
   ) { }

ngOnInit() {
  this.educationService.getLecture(this.route.snapshot.paramMap.get('id'), 
      lecture => { this.lecture = lecture;});
}
onSubmit({value, valid}: { value: Listing, valid: boolean }) {
  value.lectureId = this.lecture.id;
  if (valid) {
    this.educationService.addListing(value, () => this.location.back());
    }
   
}
}
