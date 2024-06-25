const express = require('express');
const ProjectController = require('../controllers/projectController');
const ProjectRepositoryImpl = require('../../database/mongodb/projectRepository');
const ProjectUseCases = require('../../../domain/useCases/projectUseCase');

module.exports = (db) => {
    const router = express.Router();
    const projectRepository = new ProjectRepositoryImpl(db);
    const projectUseCases = new ProjectUseCases(projectRepository);
    const projectController = new ProjectController(projectUseCases);

    router.post('/', (req, res) => projectController.createProject(req, res));
    router.get('/', (req, res) => projectController.getAllProjects(req, res));
    router.get('/:id', (req, res) => projectController.getProjectById(req, res));
    router.put('/:id', (req, res) => projectController.updateProject(req, res));
    router.delete('/:id', (req, res) => projectController.deleteProject(req, res));

    return router;
};
