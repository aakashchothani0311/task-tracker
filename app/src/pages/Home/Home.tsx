import { useState } from 'react';
import Task from '../../models/task';
import FilterPane from '../../components/FilterPane/FilterPane';
import TaskList from '../../components/TaskList/TaskList';
import { Grid } from '@mui/material';

type Props = {
    task: Task | undefined;
}

const Home = (props: Props) => {
    // States for filtered tasks & message (to be displayed on SnackBar) returned by FilterPane
    const [filteredTasks, setFilteredTasks] = useState<Task[] | undefined>(undefined);
    const [filterMessage, setFilterMessage] = useState<string>('');

    // Handler for applied filters
    const handleFilteredTasks = (tasks: Task[], message: string): void => {
        setFilteredTasks(tasks);
        setFilterMessage(message);
    }

    return (
        <Grid container spacing={2} sx={{ marginTop: "4rem" }}>
            <Grid item xs={3}>
                <FilterPane filterHandler={handleFilteredTasks} />
            </Grid>
            <Grid item xs={9}>
                <TaskList task={props.task} filterMessage={filterMessage} tasks={filteredTasks} />
            </Grid>
        </Grid>
    )
}

export default Home;