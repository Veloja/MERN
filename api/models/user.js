const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const userSchema = new Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

// Model
module.exports = mongoose.model('User', userSchema);;
