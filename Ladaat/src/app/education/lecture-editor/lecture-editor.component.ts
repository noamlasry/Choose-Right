import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lecture } from "../classes/lecture";
import { EducationService } from "../services/education.service";
import { Listing } from '../classes/listing';
import { Location } from '@angular/common';
import { MethodCall } from '@angular/compiler';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.css']
})
export class LectureEditorComponent implements OnInit {

  lecture: Lecture;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private educationService: EducationService
  ) { }

  ngOnInit() {        

    this.educationService.getLecture(this.route.snapshot.paramMap.get('id'), 
        lecture => { this.lecture = lecture;});
  }
 

}
