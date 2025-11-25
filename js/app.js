const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Load from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Initial render
renderTasks();

// Add Task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return alert("Please enter a task");

  const newTask = { id: Date.now(), text, completed: false };
  tasks.push(newTask);

  saveTasks();
  renderTasks();

  input.value = "";
});

// Enter key = Add
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Render UI
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-700 px-4 py-2 rounded-lg";

    li.innerHTML = `
      <span class="${t.completed ? 'line-through text-gray-400' : ''}">
        ${t.text}
      </span>

      <div class="flex gap-2">
        <button onclick="toggleTask(${t.id})"
                class="px-2 py-[2px] text-xs bg-green-600 rounded">Done</button>

        <button onclick="deleteTask(${t.id})"
                class="px-2 py-[2px] text-xs bg-red-600 rounded">Del</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Toggle completed
function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// Save to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
