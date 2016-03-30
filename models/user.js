// REQUIREMENTS
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// SCHEMA
var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	days: []
});

// BCRYPT
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// MODULE.EXPORTS
var User = mongoose.model('User', userSchema);
module.exports = User;