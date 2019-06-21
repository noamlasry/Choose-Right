import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from '../tasks/model/Task';
import { TaskService } from '../tasks/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase';

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
  constructor(private taskService : TaskService ,private router: Router,	private route: ActivatedRoute) { }


  ngOnInit() {
		this.taskService.getTasks(tasks => {
			this.taskData = tasks;
      console.log(this.taskData);
      console.log(this.taskService.tasksRef);
		});
  }
  //  אם ישאר זמן אעשה מחיקת מחיקה חיצונית
  removeTask(task: Task)
  {
    // alert("dd");
    if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.tasksRef.child(task.id).remove(() => {
				this.router.navigate(['/tasks/']);
			});
		}
  }

}