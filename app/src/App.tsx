import { useState } from 'react';
import Task from './models/task';
import AppBarComp from './components/AppBarComp/AppBarComp';
import Home from './pages/Home/Home';
import './App.css';

function App() {
    // New task is passed to Home which in turn passed the new task to TaskList
    const [task, setTask] = useState<Task | undefined>(undefined);

    // Handler for handling addition of new task
    const handleAdd = (task: Task): void => {
        setTask(task);
    }

    return (
        <>
            <AppBarComp addhandler={handleAdd} />
            <Home task={task} />
        </>
    )
}

export default App
