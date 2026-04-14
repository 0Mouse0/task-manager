import "../styles/TaskCard.css";
import { Task } from "../types/types";

type TaskCardProps = {
    task: Task;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
};

function TaskCard({ task, removeTask, toggleTask }: TaskCardProps) {
    return (
        <li className={`task-card ${task.completed ? "completed" : ""}`}>
        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
        />
        <span>{task.text}</span>
        <button onClick={() => removeTask(task.id)}>Eliminar</button>
        </li>
    );
}

export default TaskCard;