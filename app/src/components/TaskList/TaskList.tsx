import { useEffect, useRef, useState } from 'react';
import { getTasks } from '../../services/task-service';
import Task from '../../models/task';
import { Box } from '@mui/material';
import TaskCard from '../TaskCard/TaskCard';
import { SnackBarComp, SnackBarRef } from '../SnackBarComp/SnackBarComp';

type Props = {
    task: Task | undefined;
    tasks: Task[] | undefined;
    filterMessage: string;
}

const TaskList = (props: Props) => {
    // All tasks state
    const [tasks, setTasks] = useState<Task[]>([]); 
    useEffect(() => {
        getTasks()
        .then(t => {
            setTasks(t);
        })
    }, []);

    // Snack Bar states
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    // To set Filtered tasks
    useEffect(() => {
        if(props.tasks){
            const filteredTasks = [...props.tasks];
            setTasks(filteredTasks);
            setSnackBarMessage(props.filterMessage);
            fireSnackBar();
        }
    }, [props.tasks])

    // To add created task
    useEffect(() => {
        if(props.task) {
            const updatedTasks = [...tasks, props.task];
            setTasks(updatedTasks);
            setSnackBarMessage(`New task created - "${props.task.title}".`);
            fireSnackBar();
        }
    },[props.task])

    // Snack Bar invocation
    const childRef = useRef<SnackBarRef>(null);

    const fireSnackBar = () => {
        childRef.current?.showSnackBar();
    };

    // Update task
    const handleUpdate = (task: Task, complete: string): void => {
        const temp = tasks.filter(t => task.id == t.id)[0];
        temp.title = task.title;
        temp.description = task.description;
        temp.completed = task.completed;

        if(complete !== '')
            setSnackBarMessage(`Task "${task.title}" marked ${complete}.`);
        else
            setSnackBarMessage(`Task "${task.title}" updated succesfully.`);
        
        fireSnackBar();
    }

    // Delete task
    const handleRemove = (task: Task): void => {
        setSnackBarMessage(`Task "${task.title}" deleted succesfully.`);
        setTasks(tasks.filter(t => t.id != task.id));
        fireSnackBar();
    }

    // Style
    const listStyle = {
        border: "2px solid #d1d1d1",
        backgroundColor: "#ffffff",
        marginBottom: "1rem",
        marginRight: "1rem"
    }

    // Map all the tasks to each TaskCard
    const taskElements = tasks.map(t => <TaskCard key={t.id} task={t} updateHandler={handleUpdate} removeHandler={handleRemove}></TaskCard>);

    return (
        <div>
            <Box component="section" sx={listStyle}>
                {taskElements}
            </Box>
            <SnackBarComp ref={childRef} message={snackBarMessage} />
        </div>
    )
}

export default TaskList;