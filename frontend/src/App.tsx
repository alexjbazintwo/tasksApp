import { useEffect, useState } from "react";

interface Task {
  id: number;
  name: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/api/tasks")
    .then((res) => res.json())
    .then(setTasks);
}, []);

const addTask = async () => {
  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: input }),
  });
  const newTask: Task = await res.json();
  setTasks((prev) => [...prev, newTask]);
  setInput("");
};

const deleteTask = async (id: number) => {
  await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
  setTasks((prev) => prev.filter((task) => task.id !== id));
};


  return (
    <div>
      <h1>Task Manager</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} <button onClick={() => deleteTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
