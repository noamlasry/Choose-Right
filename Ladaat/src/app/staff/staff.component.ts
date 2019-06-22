import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

    id?: string;
    firstName: string;
    lastName: number;
    phone: string;
    email: string;
    dob: string;
    belonging: number;
    notes: string;

  constructor() { }

  ngOnInit() {
  }

}
