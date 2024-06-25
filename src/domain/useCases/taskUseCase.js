const Task = require("../entities/task");

class TaskUseCases {
    constructor(taskRepository, projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    async createTask(projectId, title, description, startTime, endTime) {
        if (new Date(startTime) >= new Date(endTime)) {
            throw new Error('Start time must be before end time');
        }

        const project = await this.projectRepository.getById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const overlappingTask = await this.taskRepository.getOverlappingTasks(projectId, startTime, endTime);
        if (overlappingTask) {
            throw new Error('Task times overlap with an existing task');
        }

        const task = new Task(null, projectId, title, description, startTime, endTime);
        return await this.taskRepository.add(task);
    }

    async getTasksByProjectId(projectId) {
        return await this.taskRepository.getByProjectId(projectId);
    }

    async updateTask(id, title, description, startTime, endTime, completed) {
        if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
            throw new Error('Start time must be before end time');
        }

        const task = await this.taskRepository.getById(id);
        if (!task) {
            throw new Error('Task not found');
        }

        const updatedTask = new Task(id, task.projectId, title || task.title, description || task.description, startTime || task.startTime, endTime || task.endTime, completed !== undefined ? completed : task.completed);

        const overlappingTask = await this.taskRepository.getOverlappingTasks(task.projectId, updatedTask.startTime, updatedTask.endTime, id);
        if (overlappingTask) {
            throw new Error('Task times overlap with an existing task');
        }

        return await this.taskRepository.update(updatedTask);
    }

    async deleteTask(id) {
        return await this.taskRepository.remove(id);
    }

    async searchTasks(query) {
        return await this.taskRepository.search(query);
    }

    async getIncompleteTasksByProjectId(projectId) {
        return await this.taskRepository.getIncompleteByProjectId(projectId);
    }
}

module.exports = TaskUseCases;
