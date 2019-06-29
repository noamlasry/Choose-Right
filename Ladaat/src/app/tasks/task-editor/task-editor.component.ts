import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { Updater } from '../../updater';
import { Task } from '../model/Task';
import { TaskService } from '../task.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {


	id?: string = '';
	description: string ='';
	expireDate: Date;
	date: Date;
	doneBy: string ='';
	executionDate: Date;
	doJob: string ='';

	task: Task = new Task();
	currTask : Task;
	
	

  private tasksRef: firebase.database.Reference = firebase.database().ref("tasks");
 
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private taskService: TaskService,
		private location: Location
	) {}
	
	ngOnInit(): void
	{	
 
		this.task.id = this.route.snapshot.paramMap.get("id");
		this.taskService.getTask(this.task.id, task => {
			this.task.copy(task);
			this.task.doJob = "";
			this.task.doneBy = "";
			this.task.executionDate = new Date();
			
		});
	


	}

	onSubmit({value, valid}: { value: Task, valid: boolean }) 
	{
		
		if (valid) {
			this.taskService.updateTask(this.task, () => this.location.back()); 
		}
	}
  
	delete() 
	{
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.tasksRef.child(this.task.id).remove(() => {	
			}).then(() => {
				this.router.navigate(['tasks']);
			});
		}
		this.router.navigate(['tasks']);
	}

}
