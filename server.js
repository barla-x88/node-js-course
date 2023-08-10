const dotenv = require('dotenv');

//location of file containing env variables
dotenv.config({ path: './config.env' });

const app = require('./app');

//using environment variables
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
