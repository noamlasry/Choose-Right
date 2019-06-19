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
  Priority = Priority;
  taskData: Task [];
  currentSort: (a: Task, b: Task) => number; 
  constructor(private taskService : TaskService ) { }
  ngOnInit() {
		this.taskService.getTasks(tasks => {
			this.taskData = tasks;
			console.log(this.taskData);
		});
  }
  get tasks() : Tasks
  {
      return this.taskService.tasks;
  }
  removeTask(task : Task) : void
  {
      this.tasks.removeTaskById(task.id);
  }

}