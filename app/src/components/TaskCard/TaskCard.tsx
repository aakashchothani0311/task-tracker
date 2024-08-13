import { useRef, useState } from 'react';
import { removeTask, updateTask } from '../../services/task-service';
import Task from '../../models/task';
import { Button, Card, CardActionArea, CardActions, CardContent,Typography } from '@mui/material';
import { UpdateModal, UpdateModalRef } from '../UpdateModal/UpdateModal';

type Props = {
    task: Task;
	updateHandler: (task: Task, complete: string) => void;
	removeHandler: (task: Task) => void;
}

const TaskCard = (props: Props) => {
	// States for task, task.completed and expanded state of the card
	const [task, setTask] = useState<Task>(props.task);
    const [expanded, setExpanded] = useState<boolean>(false);

	// Expand/ Shrink card
    const toggleExpanded = (): void => {
        setExpanded(!expanded);
    };

	// Toggle task as complete/ incomplete
    const handleComplete = (): void => {
		const tempTask = {...task};
		tempTask.completed = !tempTask.completed;

		updateTask(props.task.id, tempTask)
        .then((result: Task) => {
			if(props.updateHandler)
				props.updateHandler(result, result.completed ? 'complete' : 'incomplete');

			setTask(result);
        })
		.catch((error: Error) => {
			console.log('Error updating record', error);
		})
    }

	// Refernce of UpdateModal component. Used to invoke showModal method which shows update modal
	const updateModalRef = useRef<UpdateModalRef>(null);
    const editTask = (): void => {
        updateModalRef.current?.showModal();
    }

	// Handle task updates for title/ description
	const handleSuccessfulUpdate = (task: Task):void => {
		setTask(task);
		props.updateHandler(task, '');
	}

	// Delete Task
	const handleRemove = (): void => {
		removeTask(task.id)
		.then(() => {
			props.removeHandler(task);
		})
		.catch((error: Error) => {
			console.log('Error in removing ', error);
		})
	}

	// Parse date to readable format
    const parseDate = (d: Date): string => {
        return new Date(d).toLocaleString();
    }

	// Style to show card as complete/ incomplete
	const getCardCSS =  {
		margin: "1rem",
		boxShadow: "none",
		border: task.completed ? "2px solid #3edd1e" : "2px solid #d1d1d1",
		backgroundColor: task.completed ? "#f4fff2" : "#ffffff"
	}

	// Expand/ shrink card
	const getCardActionCSS =  {														
		height: expanded ? "fit-content" : "7rem",
		transition: "height 1s",
		overflow: "hidden"
	}

	// Wrap/ show description
	const getCardContent = {														
		maxWidth: expanded ? "fit-content" : "80%" ,
		textOverflow: expanded ? "unset" : "ellipsis",
		overflow: "hidden",
		whiteSpace: expanded ? "auto" : "nowrap"
	}
	console.log(props.task);
    return (
		<>
			<Card className="card" sx={getCardCSS}>
				<CardActionArea onClick={toggleExpanded} sx={getCardActionCSS}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{task.title}
						</Typography>
						<Typography gutterBottom variant="body1" color="text.secondary">
							Created Date: {parseDate(props.task.createdDate)}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={getCardContent}>
							{task.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary" onClick={editTask}>Edit</Button>
					<Button size="small" color="error" onClick={handleRemove}>Delete</Button>
					<Button size="small" color={task.completed ? "error" : "success"} onClick={handleComplete}>{task.completed ? "Mark Incomplete" : "Mark Complete"}</Button>
				</CardActions>
			</Card>
			<UpdateModal ref={updateModalRef} task={task} updateHandler={handleSuccessfulUpdate} />
		</>
  	);
}

export default TaskCard;