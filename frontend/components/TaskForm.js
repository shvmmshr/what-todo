export function TaskForm(fetchTasks) {
  const form = document.createElement("form");
  form.className = "task-form";

  form.innerHTML = `
    <input 
      type="text" 
      id="task-input" 
      class="task-input" 
      placeholder="What needs to be done?" 
    />
    <button type="submit" class="add-task-btn">Add Task</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value;

    if (!task.trim()) return; // Prevent empty submissions

    try {
      const response = await fetch("http://localhost:8080/add_task.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ title: task }),
      });

      const data = await response.json();
      if (data.status === "success") {
        taskInput.value = "";
        fetchTasks();
      } else {
        console.error("Error adding task:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return form;
}
