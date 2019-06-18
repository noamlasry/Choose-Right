import { Component, OnInit } from '@angular/core';
import { Task } from '../model/Task';
import { Tasks } from '../model/Tasks';
import { TaskService } from '../task.service';
import { Priority } from '../model/Priority';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit
{
  taskDescription = "";
  taskPriority = "Green";
    
  // Hack to show enum
  Priority = Priority;

  constructor(private taskService : TaskService, private router : Router) { }

  ngOnInit() {
  }
    
  addTask() : void
  {
   
      let priority;
      priority = Priority.Red;
     
      
      this.taskService.tasks.addTask(this.taskDescription, priority, new Date());
      this.taskDescription = "";
      this.taskPriority = "Green";
      
      this.router.navigate(['tasks']);
  }

}
