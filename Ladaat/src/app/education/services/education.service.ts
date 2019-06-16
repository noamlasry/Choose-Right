import { Injectable } from '@angular/core';

import {Lecture} from '../classes/lecture';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  db: firebase.database.Database;
	lectureRef: firebase.database.Reference;
	listungsRef: firebase.database.Reference;

  constructor() {
		this.db = firebase.database();
		this.lectureRef = this.db.ref("lectures");
    this.listungsRef = this.db.ref("listings");
  }
  getLecture(id: string, callback: (complexLecture: Lecture) => void): void {
    this.lectureRef.child(id).once('value')
		.then(snapshot => {
      var dono: Lecture = Lecture.create(snapshot.toJSON(), snapshot.key);
      callback(dono);
		})
		.catch(error => {
			console.log(error);
		});
	}
  getLectures(callback: (lectures: Lecture[]) => void): void {
    this.lectureRef.once('value')
    .then(lectureSnapshot => {
      var lectures: Lecture[] = [];
      lectureSnapshot.forEach(element => {
        this.getLecture(element.key, complexLecture => {
          lectures.push(complexLecture)
          if (lectures.length == lectureSnapshot.numChildren()) {
            callback(lectures);
          }
        })
      });
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  addLecture(lecture: Lecture, callback: (donor: Lecture) => void): void {
		var ref = this.lectureRef.push({
      'institute': lecture.institute,
      'year': lecture.year,
      'class': lecture.class,
      'content': lecture.content,
      'date': lecture.date,
      'lecturerName': lecture.lecturerName,
      'price': lecture.price,
      'contactName1': lecture.contactName1,
      'email1': lecture.email1,
      'phone1': lecture.phone1,
      'contactName2': lecture.contactName2,
      'email2': lecture.email2,
      'phone2': lecture.phone2
      /*'listing': Listing[];*/
		  });
		ref.then(d => {
			callback(Lecture.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
	}	
}







