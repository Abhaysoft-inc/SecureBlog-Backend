const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the useCreateIndex and useFindAndModify options
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});