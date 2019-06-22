
export class TaskEdit
{
    id?: string;
	doneBy: string;
	executionDate: Date;
	
	static create(other: Object, id?: string): TaskEdit 
	{
		var taskEdit: TaskEdit = new TaskEdit();	
		taskEdit.copy(other as TaskEdit);
		if (id) {taskEdit.id = id;}
		return taskEdit;
    }
	copy(other: TaskEdit) 
	{
		this.doneBy = (other as TaskEdit).doneBy;
		this.executionDate = (other as TaskEdit).executionDate;
	}
}