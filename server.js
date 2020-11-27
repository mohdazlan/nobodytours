const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB Connection successfull');
  });

const tourSchema = new mongoose.Schema({
  name: { type: String },
  rating: Number,
  price: { type: Number, required: [true, 'A tour must have a price'] },
});

const Tour = mongoose.model('Tour', tourSchema);
//👆🏾create a model with the name of Tour using the tourSchema

const testTour = new Tour({
  name: 'The Money Heist',
  ratitng: 2.7,
  price: 422,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR 💥:', err);
  });

console.log(process.env);
//basic port configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
