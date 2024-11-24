export function TaskList(tasks, fetchTasks) {
  const list = document.createElement("ul");
  list.className = "task-list";

  if (tasks.length === 0) {
    list.textContent = "No tasks available.";
  } else {
    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.className = "task-item";

      listItem.innerHTML = `
        <span class="task-text">${task.task}</span>
        <button class="delete-btn">&times;</button>
      `;

      const deleteBtn = listItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", async () => {
        try {
          await fetch(`http://localhost:8080/delete_task.php?id=${task.id}`);
          fetchTasks();
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      });

      list.appendChild(listItem);
    });
  }

  return list;
}
