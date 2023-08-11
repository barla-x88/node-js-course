const dotenv = require('dotenv');
const mongoose = require('mongoose');

//location of file containing env variables
dotenv.config({ path: './config.env' });

const app = require('./app');

/**MONGODB CODE */

//prepare a connection string
const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
  dbName: 'natours',
});

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

//create a new tour in database

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
});

//save the new Tour in database
testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err, 'ERROR OCCURED'));

/** express code */
//using environment variables
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
