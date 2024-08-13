import mongoose from 'mongoose';
import schemaConfig from './schema-config.js'

/* Schema model of the task collection */
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    createdDate : {
        type: Date,
        default: Date,
    }
}, schemaConfig);

export default mongoose.model('task', taskSchema);