// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        id: Date.now(),
    };

    // Save the task to local storage
    saveTask(task);

    // Add task to the list and clear input
    addTaskToList(task);
    taskInput.value = '';
});

// Delete a task
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskId = parseInt(e.target.parentElement.getAttribute('data-id'));
        deleteTask(taskId);
        e.target.parentElement.remove();
    }
});

// Function to save task to local storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => addTaskToList(task));
}

// Function to add a task to the list
function addTaskToList(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        ${task.text}
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
}

// Function to delete a task
function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
