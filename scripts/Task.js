class Task {
  constructor(title, description, dueDate = "", fileName = "", fileData = "") {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.fileName = fileName;
    this.fileData = fileData;
    this.done = false;
  }
}
