const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('../routers/cohorts-router.js');
const studentsRouter = require('../routers/students-router.js')

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;