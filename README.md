## TaskTracker

A simple MERN stack based application to show a list of tasks that support CRUD operations. The application also supports filtering capabailities to filter the tasks basis created date, title/ description and if the task is already complete.

## Instructions to run
1. Server:
- Navigate to the server directory: **cd server**.
- Run **npm install** to install the required node modules.
- Add a .env file which should contain parameters: PORT & MONGO_CONNECTION (connection URL of your MongoDB).
- Start the backend server with **npm run start**, which will run the server on the port specified in .env file.

2. Client Side:
- Navigate to the client directory: **cd app**.
- Run **npm install** to install the necessary node modules.
- Start the application with **npm run dev**, which will host it at http://localhost:3002 as specified in the Vite configuration file.
