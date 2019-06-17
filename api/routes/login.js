const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/', async (req, res, next) => {
	try {
		const [user] = await User.find({ email: req.body.email }).exec()
		if(!user) {
			return res.status(401).json({
				message: 'Auth failed, WHYYY?'
			});
		}
		const validPass = await bcrypt.compare(req.body.password, user.password)
		if(validPass) {
			return res.status(200).json({
				message: 'Auth SUCCESSFUL'
			})
		} else {
			return res.status(401).json({
				message: 'Not valid pass'
			})
		}
	} catch(err) {
		console.log('LOGIN ERR: ', err);
		res.status(500).json({
			error: err
		})
	}
	// User.find({ email: req.body.email })
	// .exec()
	// .then(user => {
	// 	if(user.length < 1) {
	// 		return res.status(401).json({
	// 			message: 'Auth failed, WHYYY?'
	// 		});
	// 	}
	// 	bcrypt.compare(req.body.password, user[0].password, (err, isMatch) => {
	// 		console.log('BODY pass', req.body.password);
	// 		console.log('USER pass', user[0].password);
	// 		console.log('CHECK', req.body.password === user[0].password);
	// 		console.log('BCRYPT RESULT: ', isMatch);
	// 		console.log('BCRYPT ERR: ', err);
	// 		if(err) {
	// 			return res.status(401).json({
	// 				message: 'Auth failed FROM BCRYPT ERROR'
	// 			});
	// 		}
	// 		if(isMatch) {
	// 			return res.status(200).json({
	// 				message: 'Auth SUCCESSFUL'
	// 			})
	// 		}
	// 		res.status(401).json({
	// 			message: 'Auth failed from BCRYPT below'
	// 		})
	// 	});
	// })
	// .catch(err => {
	// 	console.log('LOGIN ERR: ', err);
	// 	res.status(500).json({
	// 		error: err
	// 	})
	// })
});

module.exports = router;