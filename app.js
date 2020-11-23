const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//add middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//adding custom middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 🧻 ');
  next();
});

// second middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  next();
});
// ROUTES

app.use('/api/v1/tours', tourRouter);
// mounting a router on a new route
app.use('/api/v1/users', userRouter);

module.exports = app;
