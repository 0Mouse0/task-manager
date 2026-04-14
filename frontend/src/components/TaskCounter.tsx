import { Task } from "../types/types";
import "../styles/TaskCounter.css"

type TaskCounterProps = {
    tasks: Task[];
};

function TaskCounter({ tasks }: TaskCounterProps) {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    return (
        <p className="task-counter">{completed} / {total} tareas completadas</p>
    );
}

export default TaskCounter;