//Middleware to be used tourRoutes.js

//checkBody middleware
exports.checkBody = (req, res, next) => {
  if (!(req.body.name && req.body.price)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  //performing response formatting using Jsend specification
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  //send a response
  res.status(200).json({
    status: 'success',
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: '',
    },
  });
};

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
  //find the tour
  //delete tour
  // save it to the file
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
