import express from 'express';
import Journal from './journal.js'


require('dotenv').config();

const app = express();
const port_number = process.env.EXPRESSPORT || 44000
const journal_user: any = process.env.JOURNALUSER;
const journ = new Journal(journal_user);

app.get('/gun', (req, res) => {
  return res.send('Received a GET HTTP method');
});
