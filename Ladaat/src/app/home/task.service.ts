import { Injectable } from '@angular/core';
import { Tasks } from './model/Tasks';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})

export class TaskService
{
  db: firebase.database.Database;
  tasksRef: firebase.database.Reference;

  tasks = new Tasks();
    
  constructor() 
  {
		this.db = firebase.database();
	//	this.taskRef = this.db.ref("task");
    this.tasksRef = this.db.ref("tasks");
  }
  
  getTasks(id: string, callback: (complexTasks: Tasks) => void): void {
    this.tasksRef.child(id).once('value')
		.then(snapshot => {
      var dono: Tasks = Tasks.create(snapshot.toJSON(), snapshot.key);
      callback(dono);
		})
		.catch(error => {
			console.log(error);
		});
  }
  

  
  addTasks(tasks: Tasks, callback: (donor: Tasks) => void): void {
		var ref = this.tasksRef.push({
      
     

		  });
		ref.then(d => {
			callback(Tasks.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
	}	
 




}
