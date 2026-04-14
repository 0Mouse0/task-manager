// ! No funciona así
// const express = require("express");
// import { Request, Response } from "express";

// * Funciona así
import express, { Request, Response } from "express";

const cors = require("cors");

const app = express(); 
const PORT = 3000; 

app.use(cors());

app.use(express.json());

// TODO: Borrar para usar base de datos
let tasks = [
    { id: 1, text: "Study Express", completed: false }, 
    { id: 2, text: "Build backend", completed: true }
];

app.get("/", (req, res) => {
    res.send("Backend is working!"); 
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req: any, res: any) => {
    console.log("POST /tasks was call with body: ", req.body)

    const newTask = {
        id: req.body.id, 
        text: req.body.text,
        completed: req.body.completed
    };
    
    tasks.push(newTask);

    console.log("Se actualizó la lista de tareas: ", tasks);

    res.json(newTask);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
    const id = parseInt(String(req.params["id"]));
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: "Task deleted successfully" });
});

app.put("/tasks/:id", (req: Request, res: Response) => {
    const id = parseInt(String(req.params["id"]));
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    const updatedTask = tasks.find(task => task.id === id);
    res.json(updatedTask);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});