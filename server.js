const dotenv = require('dotenv');
const mongoose = require('mongoose');

//location of file containing env variables
dotenv.config({ path: './config.env' });

const app = require('./app');

//prepare a connection string
const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    dbName: 'natours',
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful');
  });

//using environment variables
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
