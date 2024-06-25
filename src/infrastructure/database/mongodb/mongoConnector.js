const { MongoClient } = require('mongodb');

class MongoConnector {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect(url, dbName) {
        this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await this.client.connect();
        this.db = this.client.db(dbName);
        console.log('Connected to MongoDB');
        await this.setupIndex()

        return this.db
    }

    async setupIndex() {
        await this.db.collection('tasks').createIndex({ title: 'text', description: 'text' });
    }

    getDb() {
        if (!this.db) {
            throw new Error('Database not connected');
        }
        return this.db;
    }

    async disconnect() {
        await this.client.close();
    }
}




module.exports = MongoConnector
