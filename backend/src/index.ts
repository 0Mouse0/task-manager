import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// TODO: Borrar para usar base de datos
/* let tasks = [
    { id: 1, text: "Study Express", completed: false }, 
    { id: 2, text: "Build backend", completed: true }
]; */

app.get("/", (req: Request, res: Response) => {
    res.send("Backend is working!");
});

app.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany({
        orderBy: { id: "asc" }
        });
        res.json(tasks);
    } catch (error) {
        console.error("Error in fetching tasks: ", error);

    }
});

app.post("/tasks", async (req: Request, res: Response) => {
    try {
        const newTask = await prisma.task.create({

            data: {
                text: req.body.text,
                completed: req.body.completed ?? false,
            }
        });
        res.json(newTask);
    } catch (error) {
        console.error("Error in creating task: ", error);
        res.status(500).json({ error: "Error creating task" });
    }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params["id"]));
        await prisma.task.delete({ where: { id } });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error in deleting the task: ", error);
        res.status(500).json({ error: "Error deleting task" });
    }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params["id"]));
        const task = await prisma.task.findUnique({ where: { id } });
        const updatedTask = await prisma.task.update({
            where: { id },
            data: { completed: !task?.completed }
        });
        res.json(updatedTask);
    } catch (error) {
        console.error("Error in toggling the completion of the task: ", error);
        res.status(500).json({ error: "Error toggling task completion" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});