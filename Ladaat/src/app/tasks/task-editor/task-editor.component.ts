import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import { UpdaterService } from '../../updater.service';
import { Task } from '../model/Task';
import { TaskEdit } from '../model/TaskEdit';
import { EditTaskService } from '../editTask.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {
	id?: string;
	doneBy: string='';
	executionDate: string='';

  private tasksRef: firebase.database.Reference = firebase.database().ref("tasks");
  private taskEditRef: firebase.database.Reference = firebase.database().ref("taskEdit");
  taskEdit: TaskEdit = new TaskEdit();
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private editTaskService: EditTaskService,
		private location: Location
		) {}
		
	ngOnInit(){	}
	 
	onSubmit({value, valid}: { value: TaskEdit, valid: boolean }) 
	{
		console.log(value);
		if (valid) 
		{
			this.editTaskService.editTask(value, () => this.location.back());
		}
	}
 
   delete() 
   {
		if (confirm("האם את בטוחה שאת רוצה למחוק?")) {
			this.tasksRef.child(this.taskEdit.id).remove(() => {
				this.router.navigate(['/tasks/']);
			});
		}
   }
}
