import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import { Task } from "../types/types";

type TaskListProps = {
    tasks: Task[];
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
};

function TaskList({ tasks, removeTask, toggleTask }: TaskListProps) {
    if (tasks.length === 0) {
        return <EmptyState />;
    }

    return (
        <ul>
        {tasks.map(task => (
            <TaskCard key={task.id} task={task} removeTask={removeTask} toggleTask={toggleTask} />
        ))}
        </ul>
    );
}

export default TaskList;