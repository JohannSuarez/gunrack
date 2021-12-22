import express from 'express';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
const app = express();
const port_number = process.env.EXPRESSPORT || 44000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: any, res, next) => {

  req.me = users[1];
  next();
});

let users: any = {
  1: {
    id: '1',
    username: 'Robin Wieruch'
  },
  2: {
    id: '2',
    username: 'Adam Golaski'
  }
}

let messages: any = {
  1: {
    id: '1',
    text: 'What am I doing?',
    username: 'Robin Wieruch'
  },
  2: {
    id: '2',
    text: 'The Truth',
    username: 'Adam Golaski'
  }
}

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});



//--------------------=| User URIs |=--------------------//


app.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});

app.put('/users', (req, res) => {
  return res.send('PUT HTTP method on user resource');
});

app.delete('/users', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
});


//--------------------=| Messages URIs |=--------------------//

app.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});


app.post('/messages', (req: any, res) => {

  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);

});

app.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;

  messages = otherMessages;
  return res.send(message);

});

app.listen(port_number, () => {
  console.log(`Example app listening on port ${port_number}!`)
});
