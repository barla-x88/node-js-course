const fs = require('fs');
const express = require('express');

const app = express();

//Using middleware
//'express.json()' is a middleware,
app.use(express.json());

//read the data first and convert the JSON to object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//callback function is called "Route Handler"
app.get('/api/v1/tours', (req, res) => {
  //performing response formatting using Jsend specification
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

//handling post requests to the server
app.post('/api/v1/tours', (req, res) => {
  //create new ID for tour
  const newId = tours[tours.length - 1].id + 1;

  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  //write new Tour to file
  //Remember to not call sync functions inside callback,
  //because we don't want to block event loop
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //201 = created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//handle URL parameters
//we can also use multiple params like so
// '/api/v1/tours/:id/:city'
// Mark any param optional by appending '?' to it like
//''/api/v1/tours/:id/:city?'

app.get('/api/v1/tours/:id', (req, res) => {
  //all paramters can be found in req.params object
  //convert id to integer
  const id = parseInt(req.params.id);

  const tour = tours.find((tour) => tour.id === id);

  //send a response
  res.status(tour ? 200 : 404).json({
    status: tour ? 'success' : 'fail',
    data: {
      tour,
    },
  });
});

//handling patch request

app.patch('/api/v1/tours/:id', (req, res) => {
  //find the tour
  //change property in tour
  // save it to the file
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: '<updated tour here>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  //find the tour
  //delete tour
  // save it to the file
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

const port = 3000;

app.listen(3000, () => {
  console.log(`App running on port ${port}.`);
});
