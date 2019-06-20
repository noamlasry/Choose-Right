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
  
    private tasksRef: firebase.database.Reference = firebase.database().ref("tasks");
    taskData: Task [];
    task: Task = new Task();

  currentSort: (a: Task, b: Task) => number; 
  constructor(private taskService : TaskService ,private router: Router,	private route: ActivatedRoute) { }


  ngOnInit() {
    this.task.id = this.route.snapshot.paramMap.get("id");

		this.taskService.getTasks(tasks => {
			this.taskData = tasks;
      console.log(this.taskData);
      console.log(this.taskService.tasksRef);
		});
  }
 /*   אם ישאר זמן אעשה מחיקת מחיקה חיצונ ית
  removeTask()
  {
    alert("dd");
    if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.tasksRef.child(this.task.id).remove(() => {
				this.router.navigate(['/tasks/' ]);
			});
		}
  }
*/
}