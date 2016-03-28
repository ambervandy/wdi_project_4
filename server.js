// REQUIREMENTS
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// PASSPORT


// CONTROLLERS
var usersController = require('./controllers/usersController');
app.use('/users', usersController);


// CONNECTION
mongoose.connect('mongodb://localhost:27017/random_weekend');


// LISTENING
mongoose.connection.once('open', function() {
	app.listen(port, function() {
		console.log('----------------------------');
		console.log('         LISTENING          ');
		console.log('----------------------------');
	});
});























