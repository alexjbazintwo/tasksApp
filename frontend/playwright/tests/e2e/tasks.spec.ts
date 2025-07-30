import { test, expect } from "@playwright/test";

test.describe("Task Management - E2E", () => {
  let taskName: string;

  test.beforeEach(async ({ page }, testInfo) => {
    taskName = `Test Task ${Date.now()} - ${testInfo.title}`;
    await page.goto("http://localhost:5173");
  });

  test("should load the app @e2e", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Task Manager" })
    ).toBeVisible();
  });

  test("should add a new task @e2e", async ({ page }) => {
    await page.getByRole("textbox").fill(taskName);
    await page.getByRole("button", { name: "Add Task" }).click();

    await expect(page.getByText(taskName)).toBeVisible();
  });

  test("should delete a task @e2e", async ({ page }) => {
    // Add the task first
    await page.getByRole("textbox").fill(taskName);
    await page.getByRole("button", { name: "Add Task" }).click();
    await expect(page.getByText(taskName)).toBeVisible();

    // Delete it
    const deleteButton = page
      .locator("li", { hasText: taskName })
      .getByRole("button", { name: "x" });

    await deleteButton.click();

    await expect(page.getByText(taskName)).not.toBeVisible();
  });
});
