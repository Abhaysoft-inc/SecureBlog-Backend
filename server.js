const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogback');
const db = require('./config/db');

app.use(cors({
  origin: '*', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and session information to be sent
  optionsSuccessStatus: 204,
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(
  session({
    secret: 'mysecretkeyyy', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true in production if using HTTPS
      httpOnly: false,
      maxAge: 3600000, // Session expiration time in milliseconds (1 hour)
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
