import { Priority } from './Priority';

/** Class representing a Task */
export class Task
{
    private _id : number;
    private _description : string;
    private _priority : Priority;
    private _date : Date;
    
    constructor(id : number = -1, description : string = "A new task." , priority : Priority = Priority.Green, date : Date = new Date())
    {
        this.id = id;
        this.description = description;
        this.priority = priority;
        this.date = date;
    }
    
    /**
    * Get the id of the Task.
    * @return {number} The Tasks id.
    */
    get id() : number
    {
        return this._id;        
    }
    
    /**
    * Sets the id of the Tasks.
    * @param {string} id - The new id value.
    */
    set id(id : number)
    {
        if (typeof id === 'undefined')
        {
            throw new Error("Task id is invalid");
        }
        
        this._id = id;
    }
    
    /**
    * Get the description of the Task.
    * @return {string} The Tasks description.
    */
    get description() : string 
    {
        return this._description;
    }
    
    /**
    * Set the description of the Task.
    * @param {string} description - The new description.
    */
    set description(description : string)
    {
        this._description = description;
    }
    
    /**
    * Get the priority or the Task.
    * @return {Priority} The Tasks priority.
    */
    get priority() : Priority
    {
        return this._priority;
    }
    
    /**
    * Set the priority of the Task.
    * @param {Priority} priority - The new prority.
    */
    set priority(priority : Priority)
    {
        this._priority = priority;
    }
    
    /**
    * Get the creation date of the Task.
    * @return {Date} the date.
    */
    get date() : Date
    {
        return this._date;
    }
    
    /**
    * Set the creation date of the Task.
    * @param {Date} date - The new creation date.
    */
    set date(date : Date)
    {
        this._date = date;
    }
}