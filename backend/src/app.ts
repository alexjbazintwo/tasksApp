import express from "express";
import cors from "cors";
import { prisma } from "./db";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const { name } = req.body;
  const newTask = await prisma.task.create({ data: { name } });
  res.json(newTask);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.task.delete({ where: { id } });
  res.status(204).end();
});

export default app;
