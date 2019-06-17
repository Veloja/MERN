const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/', async (req, res, next) => {
	try {
		//get first user with array destructuring
		const [user] = await User.find({ email: req.body.email }).exec()
		// if there is no user -> auth failed
		!user && res.status(401).json({message: 'Auth failed, WHYYY?'});
		// bcrypt compare method
		const validPass = await bcrypt.compare(req.body.password, user.password)
		// if valid password ->
		validPass ? res.status(200).json({ message: 'Auth SUCCESSFUL' }) : res.status(401).json({ message: 'Not valid pass' });
	} catch(err) {
		res.status(500).json({ error: err })
	}
});

module.exports = router;