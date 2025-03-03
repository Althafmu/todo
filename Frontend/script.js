const API_URL = "http://localhost:8080/tasks"; // Backend API

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
}

// Modify the renderTasks function
function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            toggleTask(task.id, checkbox.checked);
        });

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.tasks;
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", () => enterEditMode(task, taskText));

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "❌";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add these new functions
async function enterEditMode(task, taskTextElement) {
    const li = taskTextElement.parentElement;
    li.classList.add('editing');
    
    const input = document.createElement("input");
    input.className = "edit-input";
    input.value = task.tasks;
    
    taskTextElement.replaceWith(input);
    input.focus();

    const saveEdit = () => {
        const updatedText = input.value.trim();
        if (updatedText && updatedText !== task.tasks) {
            updateTask(task.id, {
                ...task,
                tasks: updatedText,
                completed: task.completed
            });
        }
        li.classList.remove('editing');
        input.replaceWith(taskTextElement);
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEdit();
    });

    input.addEventListener('blur', saveEdit);
}

async function updateTask(id, updatedTask) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
    });

    if (response.ok) {
        fetchTasks();
    }
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: taskText, completed: false })
    });

    if (response.ok) {
        taskInput.value = "";
        fetchTasks();
    }
}

async function toggleTask(id, completed) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) return;

    const task = await response.json(); // Get existing task details
    task.completed = completed; // Update completed status

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task) // Send full task object
    });

    fetchTasks(); // Refresh task list
}


async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks(); // Load tasks on page load

