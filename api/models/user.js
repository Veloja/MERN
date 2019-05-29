const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const userSchema = new Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: String,
	email: String,
	password: String
})

// Model
module.exports = mongoose.model('User', userSchema);;
