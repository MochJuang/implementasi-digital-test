const Project = require("../entities/project");

class ProjectUseCases {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async createProject(name, description) {
        const project = new Project(null, name, description);
        return await this.projectRepository.add(project);
    }

    async getAllProjects() {
        return await this.projectRepository.getAll();
    }

    async getProjectById(id) {
        return await this.projectRepository.getById(id);
    }

    async updateProject(id, name, description) {
        const project = new Project(id, name, description);
        return await this.projectRepository.update(project);
    }

    async deleteProject(id) {
        return await this.projectRepository.remove(id);
    }
}

module.exports = ProjectUseCases;
