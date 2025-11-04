// app.js
const express = require('express');
const app = express();

app.use(express.json());

// GET /webhook -> verificación de Meta
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge); // devolver SOLO el challenge
  }
  return res.sendStatus(403);
});

// POST /webhook -> eventos entrantes
app.post('/webhook', (req, res) => {
  console.log('Evento entrante:', JSON.stringify(req.body));
  return res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('Listening on port', PORT));
