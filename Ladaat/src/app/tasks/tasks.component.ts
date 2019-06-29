import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from '../tasks/model/Task';
import { TaskService } from '../tasks/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit 
{
  id?: string = '';
	description: string ='';
	expireDate: Date;
	date: Date;
	doneBy: string ='';
	executionDate: Date;
	doJob: string ='';



  private tasksRef: firebase.database.Reference = firebase.database().ref("tasks");
  dateToCompare: number;
  currDate: number;
  executionToCompare: number;
  deleteMisiionTimer: number = 259200000;


  taskData: Task [];
  
  currentSort: (a: Task, b: Task,) => number; 
  constructor(
    private taskService : TaskService ,private router: Router,	
    private route: ActivatedRoute,public datepipe: DatePipe,private location: Location) { }


  ngOnInit() 
  {
		this.taskService.getTasks(tasks => {
      this.taskData = tasks;
      this.filterTasks();
    });  
  }
  
  taskAlert(task: Task) 
  {
      let temp = false; 
      this.dateToCompare  = new Date(task.expireDate).valueOf();
      this.currDate = new Date().valueOf();
      
      if(this.currDate >= this.dateToCompare )
        temp = true;

     return temp;
  }

  filterTasks()
  {
    for(let i =0; i<this.taskData.length; i++)
    {
      this.executionToCompare = new Date(this.taskData[i].executionDate).valueOf();
      if(new Date().valueOf() >= this.executionToCompare + this.deleteMisiionTimer)
        this.tasksRef.child(this.taskData[i].id).remove();
    }
  }
  deleteAll()
  {
    for(let i =0; i<this.taskData.length; i++)
        this.tasksRef.child(this.taskData[i].id).remove();
  }
  removeTask(task: Task)
  {
      
    if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.tasksRef.child(task.id).remove(() => {	
			}).then(() => {
       
			});
    }
    
    
  }

  getClass(task: Task) 
  {
    if (task.doneBy) 
      return 'completed';
    
    else if (this.taskAlert(task)) 
      return 'overdue';
    
    else if (task.doJob) 
      return 'handle';
  }
}