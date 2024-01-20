document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        markTaskAsCompleted(newTask, checkbox.checked);
    });

    const taskText = document.createElement("span");
    taskText.textContent = taskInput.value;

    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);

    const buttonsContainer = document.createElement("span");
    const editButton = createButton("Edit", function () {
        editTask(newTask, taskText);
    });
    const deleteButton = createButton("Delete", function () {
        deleteTask(newTask);
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    newTask.appendChild(buttonsContainer);
    taskList.appendChild(newTask);

    saveTasks();
    taskInput.value = "";
}

function markTaskAsCompleted(taskElement, completed) {
    const taskText = taskElement.querySelector("span");
    if (completed) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
    saveTasks();
}

function editTask(taskElement, taskTextElement) {
    const updatedTask = prompt("Edit task:", taskTextElement.textContent.trim());

    if (updatedTask !== null) {
        taskTextElement.textContent = updatedTask;
        saveTasks();
    }
}

function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = taskList.getElementsByTagName("li");

    const taskArray = [];
    for (let task of tasks) {
        const taskText = task.querySelector("span").textContent;
        const completed = task.querySelector("input[type=checkbox]").checked;
        taskArray.push({ text: taskText, completed: completed });
    }

    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        const taskArray = JSON.parse(storedTasks);

        for (let taskData of taskArray) {
            const newTask = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskData.completed;
            checkbox.addEventListener("change", function () {
                markTaskAsCompleted(newTask, checkbox.checked);
            });

            const taskText = document.createElement("span");
            taskText.textContent = taskData.text;
            if (taskData.completed) {
                taskText.style.textDecoration = "line-through";
            }

            newTask.appendChild(checkbox);
            newTask.appendChild(taskText);

            const buttonsContainer = document.createElement("span");
            const editButton = createButton("Edit", function () {
                editTask(newTask, taskText);
            });
            const deleteButton = createButton("Delete", function () {
                deleteTask(newTask);
            });

            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);

            newTask.appendChild(buttonsContainer);
            taskList.appendChild(newTask);
        }
    }
}

function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
}