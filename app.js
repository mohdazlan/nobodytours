const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
// basic routing
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from the server side!');
// });

// app.post('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // the object   the data
      pelancongan: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour },
    // tour is declared above
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

//basic port configuration
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
