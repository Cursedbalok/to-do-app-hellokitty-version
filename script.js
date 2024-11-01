document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateTaskCounter();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.classList.add(priorityInput.value); 

        const dueDate = dueDateInput.value ? ` (Due: ${dueDateInput.value})` : '';
        li.innerHTML = `
            ${taskInput.value}${dueDate}
            <button onclick="removeTask(this)">❌</button>
        `;

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            updateTaskCounter();
            saveTasks();
        });

        li.style.opacity = "0";
        taskList.appendChild(li);
        setTimeout(() => { li.style.opacity = "1"; }, 10);

        taskInput.value = "";
        dueDateInput.value = ""; // Clear due date input
        updateTaskCounter();
        saveTasks();
    }
}

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasks(); // Save tasks after removing
    updateTaskCounter();
}

function clearCompletedTasks() {
    const tasks = document.querySelectorAll("li.completed");
    tasks.forEach(task => task.remove());
    saveTasks(); // Save tasks after clearing completed
    updateTaskCounter();
}

function clearAllTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks"); // Clear tasks from local storage
    updateTaskCounter();
}

function updateTaskCounter() {
    const taskCount = document.querySelectorAll("li:not(.completed)").length;
    document.getElementById("taskCount").textContent = taskCount;
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById("taskList").children;
    for (let task of taskList) {
        tasks.push({
            text: task.childNodes[0].textContent,
            completed: task.classList.contains("completed"),
            priority: task.classList[0], // get the priority class
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    
    tasks.forEach(taskData => {
        const li = document.createElement("li");
        li.classList.add(taskData.priority);
        if (taskData.completed) li.classList.add("completed");

        li.innerHTML = `
            ${taskData.text}
            <button onclick="removeTask(this)">❌</button>
        `;
        
        taskList.appendChild(li);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

const getPriorityIcon = (priority) => {
    if (priority === 'high') return '🔴'; // Red circle
    if (priority === 'medium') return '🟡'; // Yellow circle
    return '🟢'; // Green circle
};

// Update task creation
li.innerHTML = `
    ${getPriorityIcon(priorityInput.value)} ${taskInput.value}${dueDate}
    <button onclick="removeTask(this)">❌</button>
`;

