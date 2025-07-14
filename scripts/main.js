function newTaskOverlay() {
  const bg = document.createElement("div");
  bg.id = "Popup_Background";

  const popup = document.createElement("div");
  popup.id = "Popup";

  const titleElem = document.createElement("h2");
  titleElem.textContent = "Create a new task";
  popup.appendChild(titleElem);

  const titleLabel = document.createElement("div");
  titleLabel.className = "Popup_Description";
  titleLabel.textContent = "Task title";
  popup.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "TaskTitle";
  popup.appendChild(titleInput);

  const descLabel = document.createElement("div");
  descLabel.className = "Popup_Description";
  descLabel.textContent = "Description";
  popup.appendChild(descLabel);

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.id = "TaskDesc";
  popup.appendChild(descInput);

  const createBtn = document.createElement("button");
  createBtn.className = "buttonSelected";
  createBtn.id = "createTaskButton";
  createBtn.textContent = "Create";
  popup.appendChild(createBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  popup.appendChild(cancelBtn);

  bg.appendChild(popup);
  document.body.appendChild(bg);

  createBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title || !desc) {
      alert("Please fill in both fields.");
      return;
    }

    const task = new Task(title, desc);
    addTaskToStorage(task);
    document.body.removeChild(bg);
  });

  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(bg);
  });
}
