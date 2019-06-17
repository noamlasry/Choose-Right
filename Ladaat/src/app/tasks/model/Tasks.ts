import { Task } from './Task';
import { Priority } from './Priority';

export class Tasks
{
  static create(arg0: Object, key: string): Tasks {
    throw new Error("Method not implemented.");
  }
    private _tasks : Array<Task>;
    private idCounter : number = 0;
    
    constructor()
    {
        this.tasks = new Array<Task>();
    }
    
    /**
    * Get takslist.
    * @return {Task[}} The list of tasks.
    */
    get tasks() : Array<Task>
    {
        return this._tasks;
    }
    
    /**
    * Set tasklist.
    * @param {Task[]} tasks - The new list of tasks.
    */
    set tasks(tasks : Array<Task>)
    { 
        this._tasks = tasks;
    }
    
    /**
    * Get the amount of tasks.
    * @return {number} The total amount of tasks.
    */
    get size() : number
    {
        return this.tasks.length;
    }
    
    /**
    * Add a new task to the tasklist.
    * @param {string} description - The description of the new task.
    * @param {string} priority - The priority of the new task.
    * @param {Date} date - The datestring in ISO 8601 of the new task.
    */
    addTask(description : string, priority : Priority, date : Date)
    {
        let newTask = new Task(0, description, priority, date);
        
        newTask.id = this.idCounter++;
        
        this.tasks.push(newTask);
    }
    
    /**
    * Get a task by its id.
    * @param {number} id - The id of the task.
    * @return {Task} The task that corresponds to the id given.
    */
    getTask(id : number) : Task
    {
        for (let task of this.tasks)
        {
            if (task.id == id) return task;
        }
        
        throw new Error("Task not found with id: " + id);
    }
    
    getTasksByPriority(priority : Priority) : Array<Task>
    {
        let tasklist = new Array<Task>();
        
        for (let task of this.tasks)
        {
            if (task.priority == priority) tasklist.push(task);
        }
        
        return tasklist;
    }
    
    removeTaskById(id : number)
    {
        let index = this.tasks.indexOf(this.getTask(id), 0);
        
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }
}
