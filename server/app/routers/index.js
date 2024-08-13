import taskRouter from './task-routers.js';

export default (app) => {
    app.use('/tasks', taskRouter);
}
