function newTaskOverlay() {
  const bg = document.createElement("div");
  bg.id = "Popup_Background";

  const popup = document.createElement("div");
  popup.id = "Popup";

  const titleElem = document.createElement("h2");
  titleElem.textContent = "Create a new task";
  popup.appendChild(titleElem);

  // Due Date
  const dateLabel = document.createElement("div");
  dateLabel.className = "Popup_Description";
  dateLabel.innerHTML = "Due Date & Time";
  popup.appendChild(dateLabel);

  const dateInput = document.createElement("input");
  dateInput.type = "datetime-local";
  dateInput.id = "TaskDueDate";
  popup.appendChild(dateInput);

  // Task Title
  const titleLabel = document.createElement("div");
  titleLabel.className = "Popup_Description";
  titleLabel.textContent = "Task title";
  popup.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "TaskTitle";
  popup.appendChild(titleInput);

  // Task Description
  const descLabel = document.createElement("div");
  descLabel.className = "Popup_Description";
  descLabel.textContent = "Description";
  popup.appendChild(descLabel);

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.id = "TaskDesc";
  popup.appendChild(descInput);

  // Attachment (single file)
  const fileLabel = document.createElement("div");
  fileLabel.className = "Popup_Description";
  fileLabel.textContent = "Attachment (optional)";
  popup.appendChild(fileLabel);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "TaskAttachment";
  popup.appendChild(fileInput);

  // Create Button
  const createBtn = document.createElement("button");
  createBtn.className = "buttonSelected";
  createBtn.id = "createTaskButton";
  createBtn.textContent = "Create";
  popup.appendChild(createBtn);

  // Cancel Button
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  popup.appendChild(cancelBtn);

  // Add popup to page
  bg.appendChild(popup);
  document.body.appendChild(bg);

  // ✅ CLICK LISTENER
  createBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    const dueDate = dateInput.value;
    const file = fileInput.files[0];

    if (!title || !desc) {
      alert("Please fill in both fields.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileData = e.target.result;
        const newTaskObj = new Task(title, desc, dueDate, file.name, fileData);
        addTaskToStorage(newTaskObj);
        document.body.removeChild(bg);
      };
      reader.readAsDataURL(file);
    } else {
      const newTaskObj = new Task(title, desc, dueDate);
      addTaskToStorage(newTaskObj);
      document.body.removeChild(bg);
    }
  });

  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(bg);
  });
}
