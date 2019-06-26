import { Component, OnInit } from '@angular/core';
import { Lecture } from "../classes/lecture";
import { EducationService } from "../services/education.service";
import { Listing } from '../classes/listing';
import { Location } from '@angular/common';
import { MethodCall } from '@angular/compiler';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.css']
})
export class LectureEditorComponent implements OnInit {
  listingsArr: Listing[];
  lecture: Lecture;
  
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private educationService: EducationService
  ) { }

  ngOnInit() {        
    this.educationService.getLecture(this.route.snapshot.paramMap.get('id'), 
        lecture => { this.lecture = lecture;});
  }
  onSubmit({value, valid}: { value: Lecture, valid: boolean }) 
	{
	alert
		if (valid) {
			this.educationService.updateLecture(this.lecture, () => this.location.back()); 
		}
	}

}
