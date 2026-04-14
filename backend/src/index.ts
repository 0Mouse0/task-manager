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
    const tasks = await prisma.task.findMany({
        orderBy: { id: "asc" }
    });
    res.json(tasks);
});

app.post("/tasks", async (req: Request, res: Response) => {
    const newTask = await prisma.task.create({
        data: {
            text: req.body.text,
            completed: req.body.completed ?? false,
        }
    });
    res.json(newTask);
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
    const id = parseInt(String(req.params["id"]));
    await prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted successfully" });
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
    const id = parseInt(String(req.params["id"]));
    const task = await prisma.task.findUnique({ where: { id } });
    const updatedTask = await prisma.task.update({
        where: { id },
        data: { completed: !task?.completed }
    });
    res.json(updatedTask);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});