const TaskRepository = require('../../../domain/repositories/taskRepository');
const { ObjectId } = require('mongodb');

class MongoTaskRepository extends TaskRepository {
    constructor(db) {
        super();
        this.collection = db.collection('tasks');
    }

    async add(task) {
        const result = await this.collection.insertOne({
            projectId: new ObjectId(task.projectId),
            title: task.title,
            description: task.description,
            startTime: task.startTime,
            endTime: task.endTime,
            completed: task.completed
        });
        return { ...task, id: result.insertedId };
    }

    async getById(id) {
        const task = await this.collection.findOne({ _id: new ObjectId(id) });
        if (task) {
            return { ...task, id: task._id };
        }
        return null;
    }

    async getByProjectId(projectId) {
        const tasks = await this.collection.find({ projectId: new ObjectId(projectId) }).toArray();
        return tasks.map(task => ({ ...task, id: task._id }));
    }

    async update(task) {
        const { id, ...data } = task;
        await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
        return this.getById(id);
    }

    async remove(id) {
        await this.collection.deleteOne({ _id: new ObjectId(id) });
        return { message: 'Task deleted successfully' };
    }

    async search(query) {
        return await this.collection.find({ $text: { $search: query } }).toArray();
    }

    async getIncompleteByProjectId(projectId) {
        const tasks = await this.collection.find({ projectId: new ObjectId(projectId), completed: false }).toArray();
        return tasks.map(task => ({ ...task, id: task._id }));
    }

    async getOverlappingTasks(projectId, startTime, endTime, taskId = null) {
        const query = {
            projectId: new ObjectId(projectId),
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                { startTime: { $lt: startTime }, endTime: { $gt: endTime } }
            ]
        };
        if (taskId) {
            query._id = { $ne: new ObjectId(taskId) };
        }
        return await this.collection.findOne(query);
    }
}

module.exports = MongoTaskRepository;
