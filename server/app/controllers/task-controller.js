import * as taskService from '../services/task-service.js';
import { setResponse, setError } from './response-handler.js';

/* POST handler to create new task document */
export const post = async(request, response) => {
    try {
        const payload = {...request.body};
        console.log('pay', payload);

        const task = await taskService.save(payload);
        console.log(task);
        setResponse(task, response);
    } catch (error) {
        setError(error, response);
    }
}

/* GET handler to fetch all the tasks as well as according to filter criteria */
export const search = async(request, response) => {
    try {
        const query = {...request.query};

        const queryToPass = {};
        
        // Query string created as per the filter criteria passed as API pasrameters
        if(query.searchKey)
            queryToPass.$or = [{
                                    title: new RegExp(query.searchKey, 'gi')            // searchKey to be found in title
                                },
                                {
                                    description: new RegExp(query.searchKey, 'gi')      // searchKey to be found in description
                                }];

        if(query.fromDate)
            queryToPass.createdDate = {$gt: new Date(query.fromDate)};                  // Start date for the createdDate range filter

        if(query.toDate) {
            if(queryToPass.createdDate)
                queryToPass.createdDate.$lt = new Date(query.toDate);                   // End date for the createdDate range filter
            else
                queryToPass.createdDate = {$lt: new Date(query.toDate)};
        }

        if(query.completed)
            queryToPass.completed = query.completed

        console.log('queryToPass', queryToPass);

        const tasks = await taskService.search(queryToPass);
        setResponse(tasks, response);
    } catch (error) {
        setError(error, response);
    }
}

/* PUT handler to update the document identified by the passed id */
export const put = async(request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.body};

        const task = await taskService.update(id, payload);
        setResponse(task, response);
    } catch (error) {
        setError(error, response);
    }
}

/* DELETE handler to delete the document identified by the passed id */
export const remove = async(request, response) => {
    try {
        const id = request.params.id;

        await taskService.remove(id);
        setResponse({}, response);
    } catch (error) {
        setError(error, response);
    }
}