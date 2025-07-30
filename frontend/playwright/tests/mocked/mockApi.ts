export const mockTasks = [
  { id: 1, name: "Task A" },
  { id: 2, name: "Task B" },
];

export function mockTaskRoutes(
  page: import("@playwright/test").Page,
  options?: { tasks?: any[] }
) {
  const tasks = options?.tasks ?? mockTasks;

  return page.route("**/tasks**", (route, request) => {
    const method = request.method();

    if (method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(tasks),
      });
    }

    if (method === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id: 999, name: "New Mocked Task" }),
      });
    }

    if (method === "DELETE") {
      return route.fulfill({ status: 204 });
    }

    return route.continue();
  });
}
