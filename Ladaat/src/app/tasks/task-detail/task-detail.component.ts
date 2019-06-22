import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../model/Task';
import { TaskService } from '../task.service';
import { TaskEdit } from '../model/TaskEdit';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit 
{
 // id?: string;
//	doneBy: string;
//	executionDate: string;
  task: Task;
  taskEdit: TaskEdit;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) { }
  
  ngOnInit() 
  {
    this.taskService.getTask(this.route.snapshot.paramMap.get('id'), 
<<<<<<< HEAD
    task => { this.task = task;});
    console.log('1111111');
    console.log(this.task);

    this.editTaskService.getDetailTask(this.route.snapshot.paramMap.get('id'), 
    taskEdit => { this.taskEdit = taskEdit;});
    console.log(this.id);

    console.log(this.taskEdit);
    console.log('1111111');

=======
    task => { this.task = task;}); 
   
    this.taskService.getDetailTask(this.route.snapshot.paramMap.get('id'), 
    taskEdit => { this.taskEdit = taskEdit;});
   // console.log(this.taskEdit);
    
>>>>>>> de2a5c68a97c3ffa7a7e91a10fd829379f0a0312
  }

}
