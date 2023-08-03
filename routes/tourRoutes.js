const tourController = require('./../controllers/tourController');
const express = require('express');

const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID } =
  tourController;

//convention to simply call it router
const router = express.Router();

/** 
//param middleware
//takes the parameter string for which middleware will run
// In the callback we get access to 4th param, which is value of parameter 'id'
//this middleware will only run if 'tours' resource is requested and 'id' is present
router.param('id', (req, res, next, val) => {
  //do something
  console.log(`Tour is is ${val}`);
  
  next();
});
*/

//practical use of param middleware
router.param('id', checkID);

//will run at root of '/api/v1/tours'
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
