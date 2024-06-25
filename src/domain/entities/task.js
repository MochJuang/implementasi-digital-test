class Task {
    constructor(id, projectId, title, description, startTime, endTime, completed = false) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.completed = completed;
    }
}

module.exports = Task;
