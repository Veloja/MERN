const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }, (err, db) => {
	if(err) {
		console.log('ERROR BREEE');
		throw err;
		db.close()
	} else {
		console.log('CONNECTED to MongoDB');
	}

});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Allowing headers and cors origin
app.use((req, res, next) => {
	res.header('Acces-Control-Allow-Origin', '*');
	res.header('Acces-Control-Allow-Headers', 'Origin, X-Reqxuested-With, Content-Type, Authorization');
	if(req.method === 'OPTIONS') {
		res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({})
	}
	next();
})

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
