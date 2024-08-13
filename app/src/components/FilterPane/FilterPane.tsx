import { ChangeEvent, useEffect, useState } from 'react';
import { searchTasks } from '../../services/task-service';
import Task from '../../models/task';
import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

type Props = {
    filterHandler: (tasks: Task[], message: string) => void;
}

type QueryParams = {
    searchKey?: string;
    fromDate?: string;
    toDate?: string;
    completed?: boolean;
};

const FilterPane = (props: Props) => {
    // States for each field of the filter
    const [textVal, setTextVal] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [completedTask, setCompletedTask] = useState<string>('');

    // Additional states to disable filter and reset button to avoid unnecesary clicks when no filter parameter is changed 
    const [filterDisabled, setFilterDisabled] = useState<boolean>(true);
    const [resetDisabled, setResetDisabled] = useState<boolean>(true);
    const [filterApplied, setFilterApplied] = useState<boolean>(false);

    // Disabling buttons when no paremeter is added
    useEffect(() => {
        if(!textVal && !fromDate && !toDate && !completedTask){
            setFilterDisabled(true);
            setResetDisabled(true);
        } else {
            setFilterDisabled(false);
            setResetDisabled(false);
        }
    },[textVal, fromDate, toDate, completedTask])

    // Method to handle "Apply Filter" button. The method creates search string as per the filters applied
    const applyFilter = (): void => {
        const queryToPass: QueryParams = {};
        if(textVal)
            queryToPass.searchKey = textVal;

        if(fromDate)
            queryToPass.fromDate = fromDate;

        if(toDate)
            queryToPass.toDate = toDate;

        if(completedTask === 'complete')
            queryToPass.completed = true;
        else if(completedTask === 'incomplete')
            queryToPass.completed = false;

        searchTasks(queryToPass)
        .then((result: Task[]) => {
            props.filterHandler(result, 'Filters applied.');
            setFilterApplied(true);
            setFilterDisabled(true);
        })
        .catch((error: Error) => {
            console.log('Error occurred while applying filters', error);
            setFilterApplied(false);
        })
    }

    // Method to handle "Reset Filter" button. Sets all the filter values to default/ blank. Makes an api call to get all the tasks when filters are reset
    const resetFilters = (): void => {
        setTextVal('');
        setFromDate('');
        setToDate('');
        setCompletedTask('');

        if(filterApplied) {
            searchTasks({})
            .then((result: Task[]) => {
                props.filterHandler(result, 'Filters removed.');
                setFilterApplied(false);
            })
            .catch((error: Error) => {
                console.log('Error occurred while applying filters', error);
                setFilterApplied(false);
            })
        }
    }

    // Style for filter panel
    const filterStyle = {
        marginLeft: "1rem",
        border: "2px solid #d1d1d1",
        position: "sticky",
        top: "5rem"
    }

    return (
        <Card component="form" sx={filterStyle}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Filters:
                </Typography>
                <TextField name="title" type="search" label="Search by title/ description" value={textVal} fullWidth variant="standard" margin="dense"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTextVal((event.target as HTMLInputElement).value)} />
                <FormControl fullWidth margin="dense">
                    <FormLabel>From:</FormLabel>
                    <TextField name="fromdate" type="date" value={fromDate} fullWidth variant="standard"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setFromDate((event.target as HTMLInputElement).value)} />
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <FormLabel>To:</FormLabel>
                    <TextField name="todate" type="date" value={toDate} fullWidth variant="standard"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setToDate((event.target as HTMLInputElement).value)} />
                </FormControl>
                <FormControl margin="dense">
                    <FormLabel>Show All:</FormLabel>
                    <RadioGroup row value={completedTask}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setCompletedTask((event.target as HTMLInputElement).value)}>
                        <FormControlLabel value="complete" control={<Radio />} label="Completed Tasks" />
                        <FormControlLabel value="incomplete" control={<Radio />} label="Incomplete Tasks" />
                    </RadioGroup>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button variant="contained" disabled={filterDisabled} onClick={applyFilter}>Apply Filter</Button>
                <Button variant="outlined" disabled={resetDisabled} onClick={resetFilters}>Reset</Button>
            </CardActions>
        </Card>
    )
}

export default FilterPane;