import { Component, OnInit } from '@angular/core';
import { Listing } from "../classes/listing";
import { EducationService } from '../services/education.service';
import { Location } from '@angular/common';
import { Lecture } from "../classes/lecture"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing-editor',
  templateUrl: './listing-editor.component.html',
  styleUrls: ['./listing-editor.component.css']
})
export class ListingEditorComponent implements OnInit {

    id?: string;
    lectureId: string = '';
    subject: string = '';
    status: string = '';
    date: string = '';
    link: string = '';
    
    lecture: Lecture = new Lecture();

  constructor(
    private _es: EducationService,
     private location: Location,
     private route: ActivatedRoute,
     ) { }

  ngOnInit() {
  }
  onSubmit({value, valid}: { value: Listing, valid: boolean }) {
    console.log('11111');
    console.log(value);
    if (valid) {
      this._es.addListing(value, () => this.location.back());
      }
     
  }
}
