const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Using middlewares

app.use(express.json());

app.use(morgan('dev'));

//serve static contents
// serve files from public folder in current dir
app.use(express.static(`${__dirname}/public`));

//Mounting the routers at two different paths
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
