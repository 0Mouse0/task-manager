import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("JWT_SECRET environment variable is required");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


const app = express();
const PORT = process.env.PORT || 3000;

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
        const texto = req.body.text;

        // Validación: rechaza vacío o solo espacios
        if (!texto || !texto.trim()) {
            res.status(400).json({ error: "El título de la tarea no puede estar vacío" });
            return;
        }

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

if (process.env.NODE_ENV !== "test") {
    throw new Error("fallo simulado");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// TODO: This section is reserve for the authentication of users

// ! Login route for demonstration purposes.
// ! For testing purposes, the username is "admin" and the password is "password"

app.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;
    // ! Replace this with actual user authentication logic when in prod
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
    }

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        console.error("Error verificando token: ", error);
        res.status(403).json({ error: "Token inválido" });
    }
};

app.get("/private", verifyToken, (req, res) => {
    res.json({ message: "Acceso permitido" });
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("Backend is healthy!");
});

export default app;