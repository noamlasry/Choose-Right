import { Component, OnInit } from '@angular/core';
import { Lecture } from './classes/lecture';
import { EducationService } from './services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
	lectureData: Lecture[];
	currentSort: (a: Lecture, b: Lecture) => number;

	constructor(private lecturesService: EducationService) {}
	
	ngOnInit() {
		this.lecturesService.getLectures(lectures => {
			this.lectureData = lectures;
			this.sortLectures(this.compareInstituteNames);
		});
	}
	
	sortLectures(compareFunction: (a: Lecture, b: Lecture) => number): void {
		if (!this.currentSort || compareFunction != this.currentSort) {
			this.lectureData.sort(compareFunction);
		}
		else {
			this.lectureData.reverse();
		}
		
		this.currentSort = compareFunction;
	}
	
	compareInstituteNames(a: Lecture, b: Lecture): number {
		return a.institute > b.institute ? 1 : -1;
	}

	compareYears(a: Lecture, b: Lecture): number {
		return a.year > b.year ? 1 : -1;
	}
	
	compareclasses(a: Lecture, b: Lecture): number {
		return a.class > b.class ? 1 : -1;
	}
	
	compareDates(a: Lecture, b: Lecture): number {
		return a.date > b.date ? 1 : -1;
	}
	

}