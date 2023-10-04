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

//using environment variables
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
