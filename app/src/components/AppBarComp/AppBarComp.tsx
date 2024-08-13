import { useRef } from 'react';
import Task from '../../models/task';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { UpdateModal, UpdateModalRef } from '../UpdateModal/UpdateModal';

type Props = {
    addhandler: (task: Task) => void;
}

const AppBarComp = (props: Props) => {
    // Reference of child component - UpdateModal. 
    const childRef = useRef<UpdateModalRef>(null);

    // Used to invoke showModal method of UpdateModal component which displays the form
    const addTask = (): void => {
        childRef.current?.showModal();
    }

    // Handler to handle successful creation of new task
    const handleSuccessfulAdd = (task: Task): void => {
        props.addhandler(task);
    }

    // Style for navbar
    const navBarStyle = {
        backgroundColor: "#000000"
    }

    return (
        <>
            <Box>
                <AppBar>
                    <Toolbar sx={navBarStyle}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            TASK TRACKER
                        </Typography>
                        <Button color="warning" variant="outlined" onClick={addTask}>+ Add Task</Button>
                    </Toolbar>
                </AppBar>       
            </Box>
            <UpdateModal ref={childRef} task={undefined} addHandler={handleSuccessfulAdd} />
        </>
    )
}

export default AppBarComp;