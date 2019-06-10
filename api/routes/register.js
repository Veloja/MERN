const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/', (req, res, next) => {
	const newUser = new User({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	})
	// User.find({email: req.body.email})
	// .exec()
	// .then(user => {
	// 	if(user.length >= 1) {
	// 		return res.status(409).json({
	// 			message: 'User with this email already exists',
	// 			user: user
	// 		})
	// 	} else {
			newUser
			.save()
			.then(savedUser => {
				res.status(201).json({
					message: 'Created product sucessfully',
					createdUser: {
						_id: res._id,
						name: res.name,
						requset: {
							type: 'GET',
							url: 'http://localhost:3001/users/' + res._id
						}
					}
				})
			})
	// 	}
	// })
	.catch(err => {
		res.status(400).json({
			message: 'Some error occured',
			err: err
		})
	});
});

module.exports = router;
