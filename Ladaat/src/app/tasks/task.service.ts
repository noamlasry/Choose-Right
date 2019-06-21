import { Injectable } from '@angular/core';
import { Task } from './model/Task';
//import { TaskEdit } from './model/TaskEdit';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TaskService
{
  db: firebase.database.Database;
  tasksRef: firebase.database.Reference;
  taskEditRef: firebase.database.Reference;

  constructor(public datepipe: DatePipe) 
  {
		this.db = firebase.database();
    this.tasksRef = this.db.ref("tasks");
    this.taskEditRef = this.db.ref("taskEdit");
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
  

  addTask(task: Task, callback: (donor: Task) => void): void {
    task.date=new Date();
    let latest_date =this.datepipe.transform(task.date, 'M/d/yy, h:mm a');
    console.log(latest_date)
    var ref = this.tasksRef.push({
      'date':latest_date,
      'description': task.description,
      });
		ref.then(d => {
			callback(Task.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
  }	
  editTask(task: Task, callback: (donor: Task) => void): void {

  alert(task.doneBy);
    var ref = this.taskEditRef.push({
      
      'doneBy': task.doneBy,
      'executionDate': task.executionDate
      });
    
		ref.then(d => {
			callback(Task.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
	}	
 
 




}
