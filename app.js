const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./api/routes/users');


// implement try catch finally
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }, (err, db) => {
	if(err) {
		console.log('ERROR BREEE');
		db.close()
		throw err;
	} else {
		console.log('CONNECTED to MongoDB');
	}

});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

//routes for handling requests
app.use('/users', userRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

module.exports = app;
