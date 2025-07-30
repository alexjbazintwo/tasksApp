import { test, expect } from "@playwright/test";
import { mockTaskRoutes } from "./mockApi";

test.describe("Task UI - Mocked API", () => {
  test("should show tasks from a mocked response @mocked", async ({ page }) => {
    await mockTaskRoutes(page, {
      tasks: [
        { id: 1, name: "Mocked Task A" },
        { id: 2, name: "Mocked Task B" },
      ],
    });

    await page.goto("http://localhost:5173");

    await expect(page.getByText("Mocked Task A")).toBeVisible();
    await expect(page.getByText("Mocked Task B")).toBeVisible();
  });

  test("should add a task via mocked POST @mocked", async ({ page }) => {
    await mockTaskRoutes(page, {
      tasks: [],
    });

    await page.goto("http://localhost:5173");

    await page.getByRole("textbox").fill("New Mocked Task");
    await page.getByRole("button", { name: "Add Task" }).click();

    await expect(page.getByText("New Mocked Task")).toBeVisible();
  });

  test("should delete a task via mocked DELETE @mocked", async ({ page }) => {
    await mockTaskRoutes(page, {
      tasks: [{ id: 1, name: "Task to delete" }],
    });

    await page.goto("http://localhost:5173");

    await expect(page.getByText("Task to delete")).toBeVisible();
    await page.getByRole("button", { name: "x" }).click();

    await expect(page.getByText("Task to delete")).toHaveCount(0, {
      timeout: 10000,
    });

  });
});
