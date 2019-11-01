const express = require('express');
const cors = require('cors');
const projectRouter =require('./routes/projects');
const actionsRouter=require('./routes/actions');

const server = express();

server.use(express.json());
server.use(cors());

// server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Hello world</h2>`)
});


module.exports = server;