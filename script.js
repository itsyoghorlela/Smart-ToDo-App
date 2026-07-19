const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add button
addBtn.addEventListener("click", addTask);

// Press Enter
taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});

function addTask(){

    const task = taskInput.value.trim();

    if(task === ""){

        alert("Please enter a task!");

        return;

    }

    // Create list item
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function () {

    if (checkbox.checked) {
        taskText.classList.add("completed");
    } else {
        taskText.classList.remove("completed");
    }

});

    // Create task text
    const taskText = document.createElement("span");

    taskText.textContent = task;

    taskText.classList.add("task-text");

    // Complete task
    taskText.addEventListener("click", function(){

        taskText.classList.toggle("completed");

    });

    // Delete button
    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    deleteBtn.addEventListener("click", function(){

        li.remove();

    });

    li.appendChild(checkbox);

    li.appendChild(taskText);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";

    taskInput.focus();

}

checkbox.addEventListener("change", function () {

    if (checkbox.checked) {
        taskText.classList.add("completed");
    } else {
        taskText.classList.remove("completed");
    }

});