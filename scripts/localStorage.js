function addTaskToStorage(task) {
  let taskCount = parseInt(localStorage.getItem("task_amount")) || 0;
  localStorage.setItem(`task_${taskCount}`, JSON.stringify(task));
  localStorage.setItem("task_amount", taskCount + 1);
  updateList();
}

function deleteTask(taskId) {
  const index = parseInt(taskId.replace("task_", ""));
  let taskCount = parseInt(localStorage.getItem("task_amount")) || 0;

  // Shift tasks after the deleted one up by one to keep keys contiguous
  for (let i = index + 1; i < taskCount; i++) {
    const next = localStorage.getItem(`task_${i}`);
    localStorage.setItem(`task_${i - 1}`, next);
  }

  // Remove last duplicate key
  localStorage.removeItem(`task_${taskCount - 1}`);
  localStorage.setItem("task_amount", taskCount - 1);
  updateList();
}

function changeTaskState(taskId) {
  const index = parseInt(taskId.replace("task_", ""));
  const task = JSON.parse(localStorage.getItem(`task_${index}`));
  task.done = !task.done;
  localStorage.setItem(`task_${index}`, JSON.stringify(task));
  updateList();
}
