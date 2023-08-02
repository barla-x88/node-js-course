const tourController = require('./../controllers/tourController');
const express = require('express');

const { getAllTours, createTour, getTour, updateTour, deleteTour } =
  tourController;

//convention to simply call it router
const router = express.Router();

//will run at root of '/api/v1/tours'
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
