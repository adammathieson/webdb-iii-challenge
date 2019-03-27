const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('../routers/cohorts-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRouter);

module.exports = server;