import { TaskForm } from "./components/TaskForm.js";
import { TaskList } from "./components/TaskList.js";

const root = document.getElementById("root");

async function fetchTasks() {
  try {
    const response = await fetch("http://localhost:8080/get_tasks.php");
    const tasks = await response.json();
    renderTaskList(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

function renderTaskForm() {
  const container = document.querySelector(".container");
  const form = TaskForm(fetchTasks);
  container.appendChild(form);
}

function renderTaskList(tasks) {
  const container = document.querySelector(".container");
  const existingList = container.querySelector(".task-list");
  if (existingList) container.removeChild(existingList);

  const list = TaskList(tasks, fetchTasks);
  container.appendChild(list);
}

function renderApp() {
  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = "What ToDo";

  container.appendChild(title);
  root.appendChild(container);

  renderTaskForm();
  fetchTasks();
}

renderApp();
