import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../model/Task';
import { TaskService } from '../task.service';
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
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }
  
  ngOnInit() 
  {
    this.taskService.getTask(this.route.snapshot.paramMap.get('id'), 
    task => { this.task = task;});
    console.log(this.task);
  }

}
