const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require("cors");


const UserModel = require('./model/model');

const port = process.env.PORT || '5000'

var corsOptions = {
  origin: `http://localhost:${port}`
};


mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
const secureAPIRoute = require('./routes/secure-api-routes');

const app = express();

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/api', passport.authenticate('jwt', { session: false }), secureAPIRoute);
// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err)
  res.json({ error: err });
});

app.listen(port, () => {
  console.log('Server started.')
});