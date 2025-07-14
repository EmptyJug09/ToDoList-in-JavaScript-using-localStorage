let selectedFilter = "All";

function Init() {
  initInterface();

  const clearBtn = document.getElementById('clearAll');
  clearBtn.addEventListener('click', () => {
    const taskCount = parseInt(localStorage.getItem("task_amount") || "0");

    // Remove all tasks from localStorage
    for (let i = 0; i < taskCount; i++) {
      localStorage.removeItem(`task_${i}`);
    }

    localStorage.setItem("task_amount", "0");

    // Clear UI elements
    document.getElementById("listContainer").innerHTML = "";
    document.getElementById("taskAmount").innerText = "You have no task(s)...";

    updateList(); // Refresh empty list
  });
}

function initInterface() {
  updateFilters(document.getElementById("All"));
  updateList();
}

function updateFilters(target) {
  selectedFilter = target.id;

  const buttons = document.getElementById("filtersContainer").children;
  for (let btn of buttons) {
    btn.classList.remove("buttonSelected");
  }

  target.classList.add("buttonSelected");
  updateList();
}

function updateList() {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";
  const taskAmount = parseInt(localStorage.getItem("task_amount")) || 0;
  const taskText = document.getElementById("taskAmount");

  if (taskAmount === 0) {
    taskText.textContent = "You have no task(s)...";
    return;
  }

  let shownCount = 0;

  for (let i = 0; i < taskAmount; i++) {
    const taskData = localStorage.getItem(`task_${i}`);
    if (!taskData) continue;

    const task = JSON.parse(taskData);
    const isDone = task.done;

    if (
      selectedFilter === "All" ||
      (selectedFilter === "Active" && !isDone) ||
      (selectedFilter === "Completed" && isDone)
    ) {
      shownCount++;

      const wrapper = document.createElement("div");
      wrapper.className = "taskElement";
      if (isDone) wrapper.classList.add("taskDone");
      wrapper.id = `task_${i}`;

      const taskButton = document.createElement("button");
      taskButton.className = "taskButton";
      taskButton.id = `task_${i}_body`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isDone;

      const title = document.createElement("h2");
      title.textContent = task.title;

      const desc = document.createElement("p");
      desc.textContent = task.description;

      taskButton.appendChild(checkbox);
      taskButton.appendChild(title);
      taskButton.appendChild(desc);

      const removeButton = document.createElement("button");
      removeButton.className = "removeButton";
      removeButton.id = `task_${i}_remove`;
      const binIcon = document.createElement("img");
      binIcon.src = "resources/bin.png"; // replace if missing
      removeButton.appendChild(binIcon);

      taskButton.onclick = () => changeTaskState(`task_${i}`);
      removeButton.onclick = () => deleteTask(`task_${i}`);

      wrapper.appendChild(taskButton);
      wrapper.appendChild(removeButton);
      container.appendChild(wrapper);
    }
  }

  taskText.textContent = shownCount === 0
    ? "You have no task(s)..."
    : `${shownCount} task${shownCount > 1 ? "s" : ""}`;
}
