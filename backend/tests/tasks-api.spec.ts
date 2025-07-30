import request from "supertest";
import { describe, it, beforeEach, afterAll, expect } from "vitest";
import { PrismaClient } from "@prisma/client";
import app from "../src/app";

const prisma = new PrismaClient();
console.log(" Using database:", process.env.DATABASE_URL);


beforeEach(async () => {
  await prisma.task.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Task API", () => {
  it("GET /tasks should return empty list", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /tasks should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ name: "Test task" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test task");
  });

  it("DELETE /tasks/:id should delete task", async () => {
    const task = await prisma.task.create({ data: { name: "To delete" } });

    const res = await request(app).delete(`/api/tasks/${task.id}`);
    expect(res.status).toBe(204);
  });
});
