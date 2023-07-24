const express = require('express');

const app = express();

//port on which the server will listen
const port = 3000;

//define routes using get method

//response will be sent if server receives a get request
app.get('/', (req, res) => {
  //also send a response status
  res.status(200).send('Hello from the express app.');
});

//easily send a json
app.get('/getJson', (req, res) => {
  //json method takse an object
  //automatically sets content-type: application/json
  res.status(200).json({ projectName: 'Natours', version: '1.4' });
});

//handle post request with post method
app.post('/', (req, res) => {
  res.status(200).send('Data saved.');
});

//start server
app.listen(3000, () => {
  console.log(`App running on port ${port}.`);
});
