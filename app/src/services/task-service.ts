import { post, put, search, remove } from './api-service';
import Task from '../models/task';

// API string
const taskAPI = 'tasks';

// Get all tasks
export const getTasks = async(): Promise<Task[]> => {
    return await search<Task>(taskAPI, {});
}

// Get filtered tasks
export const searchTasks = async(params: {}): Promise<Task[]> => {
    return await search<Task>(taskAPI, params);
}

// Create new task
export const createTask = async(body: {}): Promise<Task> =>{
    return await post<Task>(taskAPI, body);
}

// Update exisiting task
export const updateTask = async(id: string, body: {}): Promise<Task> =>{
    return await put<Task>(taskAPI, id, body);
}

// Remove task
export const removeTask = async(id: string): Promise<JSON> => {
    return await remove<JSON>(taskAPI, id);
}