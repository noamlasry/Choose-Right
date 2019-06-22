import { Injectable } from '@angular/core';
import { Task } from './model/Task';
import { TaskEdit } from './model/TaskEdit';
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

  getDetailTask(id: string, callback: (complexTask: TaskEdit) => void): void 
  {
    this.taskEditRef.child(id).once('value')
		.then(snapshot => {
      var dono: TaskEdit = TaskEdit.create(snapshot.toJSON(), snapshot.key);
      callback(dono);
		})
		.catch(error => {
			console.log(error);
		});
  }

   getTask(id: string, callback: (complexTask: Task) => void): void 
  {
    this.tasksRef.child(id).once('value')
		.then(snapshot => {
      var dono: Task = Task.create(snapshot.toJSON(), snapshot.key);
      callback(dono);
		})
		.catch(error => {
			console.log(error);
		});
  }
<<<<<<< HEAD
  
  getTasks(callback: (tasks: Task[]) => void): void {
=======

  getDetailTasks(callback: (taskEdit: TaskEdit[]) => void): void 
  {
    this.taskEditRef.once('value')
    .then(taskSnapshot => {
      var taskEdit: TaskEdit[] = [];
      taskSnapshot.forEach(element => {
        this.getDetailTask(element.key, complexTaskEdit => {
          taskEdit.push(complexTaskEdit)
          if (taskEdit.length == taskSnapshot.numChildren()) {
            callback(taskEdit);
          }
        })
      });
    })
    .catch(error => {
      console.log(error);
    }); 
  }

  getTasks(callback: (tasks: Task[]) => void): void 
  {
>>>>>>> 7f186c264ac3bd80c0acd43c5827a5e7982b2f62
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
<<<<<<< HEAD
  

  addTask(task: Task, callback: (task: Task) => void): void {
    var ref = this.tasksRef.push({
      'date':task.date,
      'description': task.description
=======
   editTask(taskEdit: TaskEdit, callback: (donor: TaskEdit) => void): void
   {
    var ref = this.taskEditRef.push({
    
      'doneBy': taskEdit.doneBy,
      'executionDate': taskEdit.executionDate
      });
    
		ref.then(d => {
			callback(TaskEdit.create(d.toJSON(), ref.key));
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
>>>>>>> 7f186c264ac3bd80c0acd43c5827a5e7982b2f62
      });
		ref.then(d => {
			callback(Task.create(d.toJSON(), ref.key));
		})
		.catch(error => {
			console.log(error);
    });
<<<<<<< HEAD
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
=======
  }	
>>>>>>> 7f186c264ac3bd80c0acd43c5827a5e7982b2f62
}
