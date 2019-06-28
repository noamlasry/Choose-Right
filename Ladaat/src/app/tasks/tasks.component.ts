import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from '../tasks/model/Task';
import { TaskService } from '../tasks/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit 
{
  private tasksRef: firebase.database.Reference = firebase.database().ref("tasks");
  private taskDetailRef: firebase.database.Reference = firebase.database().ref("taskEdit");
  dateToCompare: number;
  currDate: number;

  taskData: Task [];
  
  currentSort: (a: Task, b: Task,) => number; 
  constructor(
    private taskService : TaskService ,private router: Router,	private route: ActivatedRoute,public datepipe: DatePipe) { }


  ngOnInit() 
  {
		this.taskService.getTasks(tasks => {
			this.taskData = tasks;
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
  
  removeTask(task: Task)
  {
    
    if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
      this.tasksRef.child(task.id).remove(() => {this.router.navigate(['/tasks/']);});
      return;
    }
    else{
      this.router.navigate(['/tasks/']);
    }
      
  }

  getClass(task: Task) 
  {
    if (task.doneBy) 
      return 'completed';
    
    else if (this.taskAlert(task)) 
      return 'overdue';
    
  }
}