const mongoose = require('mongoose');

//create a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,

    // contains value for field and error message in case of error
    required: [true, 'A tour must have a name'],

    //name should be unique
    unique: true,
  },

  //also define default values
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//create a model out of schema
//convention to start a model name with uppercase
// model method takes two arg- name and schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
