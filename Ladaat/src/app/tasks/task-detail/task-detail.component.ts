import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../model/Task';
import { TaskService } from '../task.service';
import { EditTaskService } from '../editTask.service';
import { TaskEdit } from '../model/TaskEdit';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit 
{
  id?: string;
	doneBy: string='';
	executionDate: string;
  task: Task;
  taskEdit: TaskEdit;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private editTaskService: EditTaskService
  ) { }
  
  ngOnInit() 
  {
    this.taskService.getTask(this.route.snapshot.paramMap.get('id'), 
    task => { this.task = task;}); 

    this.editTaskService.getDetailTask(this.route.snapshot.paramMap.get('id'), 
    taskEdit => { this.taskEdit = taskEdit;});
    console.log(this.taskEdit);
  }

}
