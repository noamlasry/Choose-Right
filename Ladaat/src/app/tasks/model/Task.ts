
export class Task
{
    id?: string;
	description: string;
	date: Date;
	
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
	}
}