const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/registro', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbx-xqi0vx7K0IsebkhDxwMfRAydzQUAywTgLspMOtxmkCa_pRpH_yKvB6jPIO0ASXcfGA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error en el proxy:', error);
    res.status(500).json({ success: false, error: 'Error al reenviar la solicitud' });
  }
});

module.exports = app;
