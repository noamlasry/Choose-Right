import { Component, OnInit } from '@angular/core';
import { EducationService } from "../services/education.service";
import {Lecture}from'../classes/lecture';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-lecture',
  templateUrl: './new-lecture.component.html',
  styleUrls: ['./new-lecture.component.css']
})
export class NewLectureComponent implements OnInit {
    
    id?: string;
    institute: string = '';
    year: string = '';
    class: string ='';
    content: string='';
    date: string = '';
    lecturerName: string='';
    price: string = '';
    contactName1: string = '';
    email1: string = '';
    phone1: string = '';
    contactName2: string = '';
    email2: string = '';
    phone2: string = '';

  constructor(private _es: EducationService, private location: Location) { }

  ngOnInit() {
  }
  onSubmit({value, valid}: { value: Lecture, valid: boolean }) {
    if (valid) {
      this._es.addLecture(value, () => this.location.back());
      }
     
  }
   
}
