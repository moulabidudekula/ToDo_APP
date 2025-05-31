// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks on the page
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&times;";
    delBtn.title = "Delete task";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task.");
    return;
  }
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initial render
renderTasks();
