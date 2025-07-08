// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Reemplazá esta URL por la tuya si cambia
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx-xqi0vx7K0IsebkhDxwMfRAydzQUAywTgLspMOtxmkCa_pRpH_yKvB6jPIO0ASXcfGA/exec';

app.use(cors());
app.use(bodyParser.json());

app.post('/enviar', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al reenviar a Google Apps Script:', error);
    res.status(500).json({ success: false, error: 'Error al contactar el endpoint' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});
