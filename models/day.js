// REQUIREMENTS
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// SCHEMA
var daySchema = mongoose.Schema({
	brunch: {},
	drinks: {},
	dinner: {},
	activity: {}
});


// MODULE.EXPORTS
var Day = mongoose.model('Day', daySchema);
module.exports = Day;