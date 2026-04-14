import { useState } from "react";
import "../styles/TaskInput.css"

type TaskInputProps = {
    addTask: (text: string) => void;
};

function TaskInput({ addTask }: TaskInputProps) {
    const [inputValue, setInputValue] = useState("");

    function handleAdd() {
        const trimmed = inputValue.trim();
        if (trimmed) {
        addTask(trimmed);
        setInputValue("");
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleAdd();
    }

    return (
        <div className="controls">
        <input
            type="text"
            placeholder="Escribe una nueva tarea"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd}>Agregar Tarea</button>
        </div>
    );
}

export default TaskInput;