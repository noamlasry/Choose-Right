import { Component, OnInit } from '@angular/core';
import { Task } from '../model/Task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit
{
  id?: string;
  description: string = '';
  date: Date;
  expireDate: DatePipe;
  executionDate: DatePipe;

  constructor(private _es: TaskService, private location: Location,public datepipe: DatePipe) { }

  ngOnInit() {} 

  onSubmit({value, valid}: { value: Task, valid: boolean }) 
  {
   
    if (valid) 
    {
      this._es.addTask(value, () => this.location.back());
    }  
  }
}
