import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lecture } from "../classes/lecture";
import { EducationService } from "../services/education.service";
@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  lecture: Lecture;
  /*currentSort: (a: Donation, b: Donation) => number;*/

  constructor(
    private route: ActivatedRoute,
    private educationService: EducationService
  ) { }

  ngOnInit() {
    this.educationService.getLecture(this.route.snapshot.paramMap.get('id'), 
        lecture => { this.lecture = lecture;});
        console.log(this.lecture);
  }

}
