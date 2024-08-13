import { FormEvent, forwardRef, useImperativeHandle, useState } from 'react';
import { createTask, updateTask } from '../../services/task-service';
import Task from '../../models/task';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

type Props = {
    task: Task | undefined;
    updateHandler?: (task: Task) => void | undefined;
    addHandler?: (task: Task) => void | undefined;
}

type FormData = {
    [key: string]: string;
}

export type UpdateModalRef = {
    showModal: () => void;
}

export const UpdateModal = forwardRef(( props: Props, ref ) => {
    // State to open/ close modal
    const [open, setOpen] = useState<boolean>(false);

    // Exposing this method to parent component. The method opens the modal
    const showModal = (): void => {
        setOpen(true);
    };
    useImperativeHandle(ref, () => ({ showModal }));

    // Close Modal
    const handleClose = (): void => {
        setOpen(false);
    }

    // Handle form save.  
    const handleSave = (formJson: FormData): void => {
        const task: Object = {
            title: formJson.title,
            description: formJson.description
        };

        if(props.task){    
            // Update task since props.task is present
            updateTask(props.task.id, task)
            .then((result: Task) => {
                if(props.updateHandler)
                    props.updateHandler(result);
                setOpen(false);
            })
            .catch((error: Error) => {
                console.log('Error updating record', error);
                setOpen(false);
            })
        } else {
            // Add task since props.task is not present
            createTask(task)
            .then((result: Task) => {
                if(props.addHandler)
                    props.addHandler(result);
                setOpen(false);
            })
            .catch((error: Error) => {
                console.log('Error creating record', error);
                setOpen(false);
            })
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth 
            PaperProps={{ 
                component: 'form', 
                onSubmit: (event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    handleSave(formJson);
                }
            }}
        >
            <DialogContent>
                <TextField name="title" label="Title" defaultValue={props.task?.title} required fullWidth autoFocus margin="dense" />
                <TextField name="description" label="Description" defaultValue={props.task?.description} multiline rows={5} fullWidth margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained">Save</Button>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
})