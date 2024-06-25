const express = require('express');
const TaskController = require('../controllers/taskController');
const TaskRepositoryImpl = require('../../database/mongodb/taskRepository');
const ProjectRepositoryImpl = require('../../database/mongodb/projectRepository');
const TaskUseCases = require('../../../domain/useCases/taskUseCase');

module.exports = (db) => {
    const router = express.Router();
    const projectRepository = new ProjectRepositoryImpl(db);
    const taskRepository = new TaskRepositoryImpl(db);
    const taskUseCases = new TaskUseCases(taskRepository, projectRepository);
    const taskController = new TaskController(taskUseCases);

    router.post('/projects/:projectId/tasks', (req, res) => taskController.createTask(req, res));
    router.get('/projects/:projectId/tasks', (req, res) => taskController.getTasksByProjectId(req, res));
    router.put('/tasks/:id', (req, res) => taskController.updateTask(req, res));
    router.delete('/tasks/:id', (req, res) => taskController.deleteTask(req, res));
    router.get('/tasks/search', (req, res) => taskController.searchTasks(req, res));
    router.get('/projects/:projectId/tasks/incomplete', (req, res) => taskController.getIncompleteTasksByProjectId(req, res));

    return router;
};
