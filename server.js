const express = require ('express');
const server = express();
const actionRouter = require('./actionRouter');
server.use(express.json());
const projectRouter = require('./projectRouter')



server.use('/actions', actionRouter);
server.use('./projects', projectRouter);

module.exports = server;