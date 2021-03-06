
export class Task
{
    id?: string = '';
	description: string ='';
	expireDate: Date;
	date: Date;
	doneBy: string ='';
	executionDate: Date;
	doJob: string ='';
	
	static create(other: Object, id?: string): Task 
	{
		var task: Task = new Task();	
		task.copy(other as Task);
		if (id) {task.id = id;}
		return task;
    }
	copy(other: Task) 
	{
		this.description = (other as Task).description;
		this.date = (other as Task).date;
		this.doneBy = (other as Task).doneBy;
		this.executionDate = (other as Task).executionDate;
		this.expireDate = (other as Task).expireDate;
		this.doJob = (other as Task).doJob;
	}
}