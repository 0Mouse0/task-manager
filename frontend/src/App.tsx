import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import TaskCounter from "./components/TaskCounter";
import { Task } from "./types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log("API_URL:", API_URL);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function fetchTasks() {
    fetch(`${API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks: ", error));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function addTask(text: string) {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
    .then(() => fetchTasks())
    .catch((error) => console.error("Error adding task: ", error));
  }

  function removeTask(id: number) {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
    .then(() => fetchTasks())
    .catch((error) => console.error("Error removing task: ", error));
  }

  function toggleTask(id: number) {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
    })
    .then(() => fetchTasks())
    .catch((error) => console.error("Error toggling task: ", error));
  }

  return (
    <div>
      <Header />
      <TaskInput addTask={addTask} />
      <TaskCounter tasks={tasks} />
      <TaskList tasks={tasks} removeTask={removeTask} toggleTask={toggleTask} />
      <Footer />
    </div>
  );
}

export default App;