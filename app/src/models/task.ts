// Interface to define Task model
interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdDate: Date
}

export default Task;