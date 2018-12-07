const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('rozum');
const WebSocket = require('ws');
const cors = require('cors');
const http = require('http');
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const simulators = {};

app.use(cors());
app.use(bodyParser.json());

// Simulator api

wss.on('connection', ws => {
  let simulatorId = null;
  ws.on('message', data => {
    const [cmd, ...args] = JSON.parse(data);
    switch (cmd) {
      case 'init':
        let [id] = args;
        if (simulators[id]) {
          ws.send(JSON.stringify(['init-error', 'already-used']));
          return;
        }
        simulatorId = id;
        simulators[id] = ws;
        ws.send(JSON.stringify(['init-ok']));
        debug(`simulator joined: ${id}`);
        break;
      default:
        ws.send(JSON.stringify(['unknown-command']));
        debug(`unknown command received: ${cmd}, %o`, args);
        break;
    }
  });
  ws.on('close', () => {
    debug(`simulator left: ${simulatorId}`);
    delete simulators[simulatorId];
  });
});

// Hand api

app.put('/api/:id/pose', (req, res) => {
  const { params, body } = req;
  if (!body || !body.angles || !Array.isArray(body.angles)) {
    res.status(400).send({ error: '`angles` array is required' });
    return;
  }
  if (body.angles.some(v => Number.isNaN(v))) {
    res.status(400).send({ error: '`angles` array must contain numbers' });
    return;
  }
  if (!simulators[params.id]) {
    res.status(400).send({ error: `no such simulator: ${params.id}` });
    return;
  }
  simulators[params.id].send(JSON.stringify(['pose', body.angles]));
  res.send({ ok: true });
});

app.use(express.static('./build'));

const port = +process.env.PORT || 5467;
server.listen(port, () => {
  debug(`listening on http://localhost:${port}`);
});
