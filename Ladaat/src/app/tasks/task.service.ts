import { Injectable } from '@angular/core';
import { Task } from './model/Task';
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
    this.tasksRef = this.db.ref("tasks");
  }
  
  getTask(id: string, callback: (complexTask: Task) => void): void {
    this.tasksRef.child(id).once('value')
		.then(snapshot => {
      var dono: Task = Task.create(snapshot.toJSON(), snapshot.key);
      callback(dono);
		})
		.catch(error => {
			console.log(error);
		});
  }
  getTasks(callback: (tasks: Task[]) => void): void {
    this.tasksRef.once('value')
    .then(taskSnapshot => {
      var tasks: Task[] = [];
      taskSnapshot.forEach(element => {
        this.getTask(element.key, complexLecture => {
          tasks.push(complexLecture)
          if (tasks.length == taskSnapshot.numChildren()) {
            callback(tasks);
          }
        })
      });
    })
    .catch(error => {
      console.log(error);
    });
    
  }
  

  addTasks(task: Task, callback: (donor: Task) => void): void {
		var ref = this.tasksRef.push({
      'date': task.date,
      'description': task.description,
     

		  });
		ref.then(d => {
			callback(Task.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
	}	
 




}
