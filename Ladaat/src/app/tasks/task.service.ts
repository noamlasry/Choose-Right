import { Injectable } from '@angular/core';
import { Task } from './model/Task';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TaskService
{
  db: firebase.database.Database;
  tasksRef: firebase.database.Reference;

  constructor(public datepipe: DatePipe) 
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
        this.getTask(element.key, complexTask => {
          tasks.push(complexTask)
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
  

  addTask(task: Task, callback: (task: Task) => void): void {
    var ref = this.tasksRef.push({
      'date':task.date,
      'description': task.description
      });
		ref.then(d => {
			callback(Task.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
  }

  updateTask(task: Task, callback: (task: Task) => void): void {
    var ref = this.tasksRef.child(task.id).set({
      'date':task.date,
      'description': task.description,
      'executionDate': task.executionDate.toString(),
      'doneBy': task.doneBy
      });
		ref.then(d => {
			callback(task);
		})
		.catch(error => {
			console.log(error);
    });
  }
}
