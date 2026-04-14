import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import TaskCounter from "./components/TaskCounter";
import { Task } from "./types/types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error )
      });

  },[]);

  function addTask(text: string) {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("TAsk added: ", data);
      setTasks([...tasks, data]);
    })
    .catch((error) => {
      console.error("Error adding task: ", error)
    })


    //setTasks([...tasks, newTask]);
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleTask(id: number) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
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