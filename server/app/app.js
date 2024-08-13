import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import initRoutes from './routers/index.js';

export default (app) => {
    app.use(cors());                                // Cross Origin Resources Sharing
    app.use(express.json());                        // Handling JSON payloads
    app.use(express.urlencoded());                  // Handling encoded URLs

    mongoose.connect(process.env.MONGO_CONNECTION); // Connecting to MongoDB collection via mongoose
    initRoutes(app);
}
