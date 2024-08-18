## TaskTracker

A simple MERN stack based application to show a list of tasks and supports CRUD operations. The application also supports filtering capabilities to filter the tasks basis created date, title/ description and if the task is already complete.

## Setup
#### Server:
1. Navigate to the server directory: **cd server**.
2. Run **npm install** to install the required node modules.
3. Add a .env file which should contain parameters: PORT & MONGO_CONNECTION (connection URL of your MongoDB).
4. Start the backend server with **npm run start**, which will run the server on the port specified in .env file.

#### Client Side:
1. Navigate to the client directory: **cd app**.
2. Run **npm install** to install the necessary node modules.
3. Start the application with **npm run dev**, which will host it at http://localhost:3002 as specified in the Vite configuration file.
