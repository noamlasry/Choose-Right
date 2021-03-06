import { Injectable } from '@angular/core';
import { Listing } from "../classes/listing";
import {Lecture} from '../classes/lecture';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  db: firebase.database.Database;
	lectureRef: firebase.database.Reference;
	listingsRef: firebase.database.Reference;

  constructor() {
		this.db = firebase.database();
		this.lectureRef = this.db.ref("lectures");
    this.listingsRef = this.db.ref("listings");
  }
  updateListing(listing: Listing, callback: (task: Listing) => void): void 
  {
    var ref = this.listingsRef.child(listing.id).set({
      'subject': listing.subject,
      'status': listing.status,
      'date': listing.date,
      'link': listing.link,
      'lectureId': listing.lectureId
      });
		ref.then(d => {
			callback(listing);
		})
		.catch(error => {
			console.log(error);
    });
  }
  updateLecture(lecture: Lecture, callback: (task: Lecture) => void): void 
  {
    var ref = this.lectureRef.child(lecture.id).set({
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
      });
		ref.then(d => {
			callback(lecture);
		})
		.catch(error => {
			console.log(error);
    });
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
  getListing(id: string, callback: (complexListing: Listing) => void): void {
    this.listingsRef.child(id).once('value')
		.then(snapshot => {
      var dono: Listing = Listing.create(snapshot.toJSON(), snapshot.key);
      callback(dono);
    })
		.catch(error => {
			console.log(error);
    });
	}
  getListings(callback: (listing: Listing[]) => void): void 
  {
    this.listingsRef.once('value')
    .then(listingSnapshot => 
      {
      var listings: Listing[] = [];
      listingSnapshot.forEach(element=> 
        {
        this.getListing(element.key, complexListing => 
          {
            listings.push(complexListing)
          if (listings.length == listingSnapshot.numChildren()) 
          {
            callback(listings);
          }
        })
      });
      
    })
    .catch(error => {
      console.log(error);
    });
  }
  addListing(listing: Listing, callback: (listing: Listing) => void): void {
		var ref = this.listingsRef.push({ 
      'subject': listing.subject,
      'status': listing.status,
      'date': listing.date,
      'link': listing.link,
      'lectureId': listing.lectureId
      });
		ref.then(d => {
			callback(Listing.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
  }	
  
  addLecture(lecture: Lecture, callback: (lecture: Lecture) => void): void {
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
		  });
		ref.then(d => {
			callback(Lecture.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
	}	
}







