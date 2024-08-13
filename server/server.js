import express from 'express';
import dotenv from 'dotenv';
import initApp from './app/app.js';

dotenv.config();                                                        // Configuring the .env file which stores environemnt variables

const app = express();                                                  // Initialising express
const PORT = process.env.PORT;

initApp(app);
app.listen(PORT, () => console.log('Server runing on PORT',PORT));      // Starting server on PORT