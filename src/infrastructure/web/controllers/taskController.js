class TaskController {
    constructor(taskUseCases) {
        this.taskUseCases = taskUseCases;
    }

    async createTask(req, res) {
        const { projectId } = req.params;
        const { title, description, startTime, endTime } = req.body;
        try {
            const task = await this.taskUseCases.createTask(projectId, title, description, startTime, endTime);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getTasksByProjectId(req, res) {
        const { projectId } = req.params;
        try {
            const tasks = await this.taskUseCases.getTasksByProjectId(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateTask(req, res) {
        const { id } = req.params;
        const { title, description, startTime, endTime, completed } = req.body;
        try {
            const task = await this.taskUseCases.updateTask(id, title, description, startTime, endTime, completed);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;
        try {
            await this.taskUseCases.deleteTask(id);
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async searchTasks(req, res) {
        const { q } = req.query;
        try {
            const tasks = await this.taskUseCases.searchTasks(q);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getIncompleteTasksByProjectId(req, res) {
        const { projectId } = req.params;
        try {
            const tasks = await this.taskUseCases.getIncompleteTasksByProjectId(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TaskController;
