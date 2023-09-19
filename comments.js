// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create event handler for comment create event
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  // If comment is created, check if it contains 'orange'
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    // Emit CommentModerated event
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});