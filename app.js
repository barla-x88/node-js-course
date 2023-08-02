const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//Using middleware
//'express.json()' is a middleware,
app.use(express.json());

app.use(morgan('dev'));

//read the data first and convert the JSON to object
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  //performing response formatting using Jsend specification
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  //find the tour
  //change property in tour
  // save it to the file
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: '<updated tour here>',
    },
  });
};

const deleteTour = (req, res) => {
  //find the tour
  //delete tour
  // save it to the file
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  // 500 => internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const createUser = (req, res) => {
  // 500 => internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

// Using separate routers

const tourRouter = express.Router();
const userRouter = express.Router();

//will run at root of '/api/v1/tours'
tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Users route
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//we want to use techRouter for a specific route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;

app.listen(3000, () => {
  console.log(`App running on port ${port}.`);
});
