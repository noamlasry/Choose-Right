import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from '../tasks/model/Task';
import { TaskService } from '../tasks/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit 
{
  taskData: Task [];
  currentSort: (a: Task, b: Task) => number; 
  constructor(private taskService : TaskService ) { }
  ngOnInit() {
		this.taskService.getTasks(tasks => {
			this.taskData = tasks;
      console.log(this.taskData);
      console.log(this.taskService.tasksRef);
		});
  }
  
  

}