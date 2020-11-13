const express = require('express');

const app = express();

//basic routing
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!');
});

app.post('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

//basic port configuration
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
