const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
	User.find()
	.select('_id name password email')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			users: docs.map(doc => {
				return {
					_id: doc._id,
					name: doc.name,
					password: doc.password,
					email: doc.email,
					url: {
						type: 'GET',
						url: 'http://localhost:3001/users/' + doc._id
					}
				}
			})
		}
		res.status(200).json(response);
	})
	.catch(err => {
		console.log('Error', err);
		res.status(500).json({
			errer: err
		})
	})
});

router.post('/', (req, res, next) => {
	const newUser = new User({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >= 1) {
			return res.status(409).json({
				message: 'User with this email already exists',
				user: user
			})
		} else {
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
		}
	})
	.catch(err => {
		res.status(400).json({
			message: 'Some error occured',
			err: err
		})
	});
});


router.get('/:userId', (req, res, next) => {
	const id = req.params.userId;
	User.findById(id)
	.select('_id name password')
	.exec()
	.then(doc => {
		console.log('document from data base', doc)
		if(doc) {
			res.status(200).json(doc)
		} else {
			res.status(404).json({message: 'No valid entry found for provided ID'})
		}
	})
	.catch(err => {
		console.log('Something went wrong', err);
		res.status(500).json({error: err});
	})
})

router.patch('/:userId', (req, res, next) => {
	const id = req.params.userId;
	const updateOps = {};
	for(const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	User.update({_id: id}, { $set: updateOps })
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Product updated',
			request: {
				type: 'GET',
				url: 'http://localhost:3001/products/' + id
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
});

router.delete('/:userId', (req, res, next) => {
	const id = req.params.userId;
	User.deleteOne({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Product deleted',
			request: {
				type: 'POST',
				url: 'localhost://3001/users',
				body: { name: 'String', password: 'String', email: 'String' }
			}
		});
	})
	.catch(err => {
		console.log('Error', err)
		res.status(404).json({
			error: err
		})
	})
});

module.exports = router;
