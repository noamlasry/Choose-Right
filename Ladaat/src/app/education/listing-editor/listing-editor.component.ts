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
    
  listing: Listing = new Listing();

  constructor(
    private educationService: EducationService,
     private location: Location,
     private route: ActivatedRoute,
     ) { }

  ngOnInit() {
    this.educationService.getListing(this.route.snapshot.paramMap.get('id'), 
        listing => { this.listing = listing;});
  }



  onSubmit({value, valid}: { value: Listing, valid: boolean }) {
    this.listing.link = (document.getElementById('url') as HTMLInputElement).value;
    
    if (valid) {
      this.educationService.updateListing(this.listing, () => this.location.back());
      }
     
  }
}
