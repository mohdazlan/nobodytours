const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

//adding middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware ');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // the object   the data
      pelancongan: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  console.log(req.requestTime);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour },
    // tour is declared above
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // status 200 is ok
  // status 201 is created
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  //204 means no content
  res.status(204).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// //apply update verb
// app.patch('/api/v1/tours/:id', updateTour);
// //delete request
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

tourRouter.route('/').get(getAllTours).post(createTour);

// second middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  next();
});

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//basic port configuration
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
