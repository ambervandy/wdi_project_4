// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMA
var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	days: []
});

// BCRYPT

// MODULE.EXPORTS
var User = mongoose.model('User', userSchema);
module.exports = User;