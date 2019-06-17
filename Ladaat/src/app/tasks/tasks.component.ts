import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Tasks } from '../tasks/model/Tasks';
import { Task } from '../tasks/model/Task';
import { Priority } from '../tasks/model/Priority';
import { TaskService } from '../tasks/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit 
{
  
  get tasks() : Tasks
  {
      return this.taskService.tasks;
  }
    
  // This is a hack that enables us to use imported enums.
  Priority = Priority;
    
  constructor(private taskService : TaskService ) { }


  ngOnInit() 
  {
  }
    
  removeTask(task : Task) : void
  {
      this.tasks.removeTaskById(task.id);
      
      
  }

}