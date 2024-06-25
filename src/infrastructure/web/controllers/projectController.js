class ProjectController {
    constructor(projectUseCases) {
        this.projectUseCases = projectUseCases;
    }

    async createProject(req, res) {
        const { name, description } = req.body;
        try {
            const project = await this.projectUseCases.createProject(name, description);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProjects(req, res) {
        try {
            const projects = await this.projectUseCases.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProjectById(req, res) {
        try {
            const project = await this.projectUseCases.getProjectById(req.params.id);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProject(req, res) {
        const { name, description } = req.body;
        try {
            const project = await this.projectUseCases.updateProject(req.params.id, name, description);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProject(req, res) {
        try {
            await this.projectUseCases.deleteProject(req.params.id);
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProjectController;
