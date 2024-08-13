/* Helper method to set success status code and response data */
export const setResponse = (data, response) => {
    response.json(data);
    response.status(200);
}

/* Helper method to set error status code and error message */
export const setError = (error, response) => {
    console.log(error);
    response.status(500);
    response.json({
        error: {
            code: "InternalServerError",
            message: "Error occured while processing the request."
        }
    })
}