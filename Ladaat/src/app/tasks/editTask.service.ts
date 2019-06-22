import { Injectable } from '@angular/core';
import { TaskEdit } from './model/TaskEdit';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EditTaskService
{
  db: firebase.database.Database;
  taskEditRef: firebase.database.Reference;

  constructor(public datepipe: DatePipe) 
  {
	this.db = firebase.database();
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
 
 




}
