export default class Task {
  constructor(TaskName, TaskDurationMs) {
    this.name = TaskName;
    this.duration = TaskDurationMs;
  }
  edit(newName, newDuration = this.duration) {
    this.name = newName;
    this.duration = newDuration;
  }
}
