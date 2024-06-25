const ProjectRepository = require('../../../domain/repositories/projectRepository');
const { ObjectId } = require('mongodb');

class MongoProjectRepository extends ProjectRepository {
    constructor(db) {
        super();
        this.collection = db.collection('projects');
    }

    async add(project) {
        const result = await this.collection.insertOne({
            name: project.name,
            description: project.description
        });
        return { ...project, id: result.insertedId };
    }

    async getById(id) {
        const project = await this.collection.findOne({ _id: new ObjectId(id) });
        if (project) {
            return { ...project, id: project._id };
        }
        return null;
    }

    async getAll() {
        const projects = await this.collection.find().toArray();
        return projects.map(project => ({ ...project, id: project._id }));
    }

    async update(project) {
        const { id, ...data } = project;
        await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
        return this.getById(id);
    }

    async remove(id) {
        await this.collection.deleteOne({ _id: new ObjectId(id) });
        return { message: 'Project deleted successfully' };
    }
}

module.exports = MongoProjectRepository;
