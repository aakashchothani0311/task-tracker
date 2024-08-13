const serverUrl = 'http://localhost:3000';

// GET method to query all/ filtered tasks as per the value of params passed
export const search = async <T>(path: string, params: {}): Promise<T[]> => {
    const query: URLSearchParams = new URLSearchParams(params);
    const response = await fetch(`${serverUrl}/${path}/?${query}`, { method: 'GET' });
    return response.json();
}

// POST method to create new task as per the values passed in body 
export const post = async <T>(path: string, body: {}): Promise<T> => {
    const response = await fetch(`${serverUrl}/${path}`, {
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

// PUT method to update existing task identified by the id and values passed in body
export const put = async <T>(path: string, id: string,  body: {}): Promise<T> => {
    const response = await fetch(`${serverUrl}/${path}/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

// DELETE method to delete a task identified by the id
export const remove = async <T>(path: string, id: string): Promise<T> => {
    const response = await fetch(`${serverUrl}/${path}/${id}`, { method: 'DELETE' });
    return response.json();
}