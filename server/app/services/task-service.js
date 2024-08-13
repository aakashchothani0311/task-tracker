import Task from '../models/tasks.js';

/* Service method to save a new document to MongoDB */
export const save = async (newTask) => {
    const task = new Task(newTask);
    return await task.save();
}

/* Service method to search/ filter task documents in MongoDB */
export const search = async (query = {}) => {
    const result = Task.find(query).exec();
    return result;
}

/* Service method to update a task document in MongoDB */
export const update = async (id, updateTask) => {
    const task = await Task.findByIdAndUpdate(id, updateTask, {new: true}).exec();
    return task;
}

/* Service method to delete a task document from MongoDB */
export const remove = async (id) => {
    const result = await Task.findByIdAndDelete(id).exec();
    return result;
}