import express from 'express';
import * as taskController from '../controllers/task-controller.js';

const router = express.Router();

/* Router configuration for default routing */
router.route('/')
    .post(taskController.post)
    .get(taskController.search);

/* Router configuration for routing with document id as parameter */
router.route('/:id')
    .put(taskController.put)
    .delete(taskController.remove);

export default router;