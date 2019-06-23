import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import { UpdaterService } from '../../updater.service';
import { Task } from '../model/Task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {
	id: string;
	doneBy: string;
	description: string='';
	executionDate: string='';
	expireDate: string ='';
	task: Task = new Task();

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
		});
	}

	onSubmit({value, valid}: { value: Task, valid: boolean }) 
	{
		this.task.doneBy = this.doneBy;
		this.task.executionDate = new Date(this.executionDate);
		this.task.description = this.description;
		this.task.expireDate = this.expireDate;

		if (valid) {
			this.taskService.updateTask(this.task, () => this.location.back()); 
		}
	}
  
	delete() 
	{
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.tasksRef.child(this.task.id).remove(() => {
				this.router.navigate(['/tasks/']);
			});
		}
	}
}
