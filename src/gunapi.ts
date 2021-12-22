import express from 'express';
import Journal from './journal.js'


require('dotenv').config();

const app = express();
const port_number = process.env.EXPRESSPORT || 44000
const journal_user: any = process.env.JOURNALUSER;
const journ = new Journal(journal_user);

app.use(express.json());            // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // You really need to look this up.

app.get('/gun', (req, res) => {
  let gun_reply: string = "";

  journ.viewEntries().then(entries => {
    return res.send(entries);
  })

  //return res.send('GUNAPI received a GET HTTP method');
});

app.post('/gun', (req: any, res) => {

  //console.log(req.body.text);
  journ.insertEntry(req.body.text);
  return res.send("POSTED!");

});

app.listen(port_number, () => {
  console.log(`Example app listening on port ${port_number}!`)
});
