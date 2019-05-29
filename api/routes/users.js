const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
	User.find()
	.exec()
	.then(docs => {
		console.log('All docs', docs);
			console.log('docs', docs)
			res.status(200).json(docs);
	})
	.catch(err => {
		console.log('Error', err);
		res.status(500).json({
			errer: err
		})
	})
});

router.post('/', (req, res, next) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	user
	.save()
	.then(user => {
		res.status(201).json({
			message: 'Handling POST req to / products',
			createdUser: user
		})
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
		console.log(result)
		res.status(200).json(result);
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
	User.remove({_id: id})
	.exec()
	.then(result => {
		console.log(res);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log('Error', err)
		res.status(404).json({
			error: err
		})
	})
});

module.exports = router;
