
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

const deleteAllBtn = document.getElementById("deleteAllBtn");
const dueDateInput = document.getElementById("dueDateInput");

// ===============================
// TASK DATA
// Load saved tasks from Local Storage
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task button
addBtn.addEventListener("click", addTask);

// Press Enter to add task
taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});

// Delete all tasks
deleteAllBtn.addEventListener("click", deleteAllTasks);

// ===============================
// ADD TASK
// Creates a new task and updates the app
// ===============================

function addTask() {

    // Get the text from the input
    const taskText = taskInput.value.trim();

    // Don't allow empty tasks
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new task object
    const newTask = {
        text: taskText,
        completed: false,
        dueDate: dueDateInput.value
    };

    // Add the task to the array
    tasks.push(newTask);

    // Save tasks to Local Storage
    saveTasks();

    // Refresh the task list
    renderTasks();

    // Clear the input
    taskInput.value = "";
    dueDateInput.value = "";

    // Put the cursor back in the input
    taskInput.focus();

}

// Save the tasks array to Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
// FORMAT DATE
function formatDate(dateString) {

    if (!dateString) {
        return "📅 No due date";
    }

    const date = new Date(dateString);

    return `📅 Due: ${date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })}`;

}

// CHECK TASK STATUS
function getTaskStatus(dueDate) {

    if (!dueDate) {
        return "";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate < today) {
        return "🔴 Overdue";
    }

    if (taskDate.getTime() === today.getTime()) {
        return "🟢 Due Today";
    }

    return "";

}

// RENDER TASKS
function renderTasks() {

    if (tasks.length === 0) {

        deleteAllBtn.style.display = "none";

        taskList.innerHTML = `
            <div class="empty-state">
                <h2>📝</h2>
                <p>No tasks yet.</p>
                <small>Add one above!</small>
            </div>
        `;

        updateCounter();

        return;

    }

    deleteAllBtn.style.display = "block";

    // Sort tasks before displaying them
    tasks.sort(function(a, b){

        if(!a.dueDate && !b.dueDate){
            return 0;
        }

        if(!a.dueDate){
            return 1;
        }

        if(!b.dueDate){
            return -1;
        }

        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

        return dateA - dateB;

    });

    taskList.innerHTML = "";

    // Loop through each task
tasks.forEach(function(task, index) {

    // Create a new list item
    const li = document.createElement("li");

    // Add HTML to the list item
    li.innerHTML = `

        <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${index})"
        >

        <div class="task-content">

            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <p class="task-date">
                ${formatDate(task.dueDate)}
            </p>

            <p class="task-status ${
                getTaskStatus(task.dueDate) === "🔴 Overdue"
                    ? "overdue"
                    : getTaskStatus(task.dueDate) === "🟢 Due Today"
                    ? "today"
                    : ""
            }">
                ${getTaskStatus(task.dueDate)}
            </p>

        </div>

        <div class="task-actions">

            <button
                class="edit-btn"
                onclick="editTask(${index})">
                <i class="fa-solid fa-pen"></i>
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>

`;

    // Add the list item to the page
    taskList.appendChild(li);

});

updateCounter();

} // <-- This closes renderTasks()

// ===============================
// UPDATE COUNTER
// ===============================

function updateCounter() {

    // Total number of tasks
    const total = tasks.length;

    // Number of completed tasks
    const completed = tasks.filter(task => task.completed).length;

    // Remaining tasks
    const remaining = total - completed;

    // Update the HTML
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;

}
// Mark a task as completed or incomplete

function toggleTask(index) {

    // Change true to false or false to true
    tasks[index].completed = !tasks[index].completed;

    // Save the updated tasks
    saveTasks();

    // Refresh the page
    renderTasks();

}

// DELETE TASK
function deleteTask(index) {

    // Remove one task at the selected index
    tasks.splice(index, 1);

    // Save the updated tasks
    saveTasks();

    // Refresh the task list
    renderTasks();

}

// Edit an existing task
function editTask(index) {

    // Show the current task in a popup
    const newTask = prompt(
        "Edit your task:",
        tasks[index].text
    );

    // If the user pressed Cancel
    if (newTask === null) {
        return;
    }

    // Remove extra spaces
    const updatedTask = newTask.trim();

    // Don't allow empty tasks
    if (updatedTask === "") {
        alert("Task cannot be empty.");
        return;
    }

    // Update the task
    tasks[index].text = updatedTask;

    // Save changes
    saveTasks();

    // Refresh the page
    renderTasks();

}

// DELETE ALL TASKS
function deleteAllTasks() {

    // Don't do anything if there are no tasks
    if (tasks.length === 0) {
        alert("There are no tasks to delete.");
        return;
    }

    // Ask for confirmation
    const confirmDelete = confirm(
        "Are you sure you want to delete all tasks?"
    );

    // Stop if the user clicks Cancel
    if (!confirmDelete) {
        return;
    }

    // Empty the array
    tasks = [];

    // Save changes
    saveTasks();

    // Refresh the page
    renderTasks();

}