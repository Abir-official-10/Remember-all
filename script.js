let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  tasks.forEach(createTaskElement);
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;
  if (tasks.includes(taskText)) {
    alert("Task already exists.");
    return;
  }

  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createTaskElement(taskText);
  input.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = taskText;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    const newTask = input.value.trim();
    if (newTask === "") return;
    if (newTask !== taskText && tasks.includes(newTask)) {
      alert("Task already exists.");
      return;
    }

    tasks = tasks.map(t => (t === taskText ? newTask : t));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskText = newTask;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    tasks = tasks.filter(task => task !== input.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(deleteBtn);

  document.getElementById("tasklist").appendChild(li);
}

function filterTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const items = document.querySelectorAll("#tasklist li");

  items.forEach((item) => {
    const input = item.querySelector("input");
    const text = input ? input.value.toLowerCase() : "";
    item.style.display = text.includes(search) ? "" : "none";
  });
}