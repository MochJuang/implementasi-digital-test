const express = require('express');
const bodyParser = require('body-parser');
const mongoConnector = require('../database/mongodb/mongoConnector');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB and start the server
const port = process.env.PORT || 3000;
new mongoConnector().connect('mongodb://root:root@localhost:27017', 'project-management')
    .then(db => {
        const projectRoutes = require('./routes/projectRoutes')(db);
        const taskRoutes = require('./routes/taskRoutes')(db);

        app.use('/projects', projectRoutes);
        app.use('/', taskRoutes); // tasks route included here for '/tasks/...'

        app.use((err, req, res, next) => {
            res.status(500).json({ error: err.message });
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
