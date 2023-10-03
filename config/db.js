const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhayvis:6UyBgg1DrUlX3ndU@cluster0.6s7tpox.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the useCreateIndex and useFindAndModify options
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
