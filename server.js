const express = require('express');
const constants = require('./config/constants');

const app = express();
const hbs = require('hbs');
const helpers = require('handlebars-helpers')();

const bodyParser = require('body-parser');
const unirest = require('unirest');

const port = process.env.PORT || 8000;
const path = require('path');
const favicon = require('serve-favicon');

hbs.registerPartials(__dirname + '/dev/partials');

app.use(express.static(__dirname + '/build'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.set('views', __dirname + '/dev/');

// routes

// Routes: Sites
app.get('/', function(req, res, next) {
	res.render('')
});

// Routes: Sites
app.get('/users/:_id', function(req, res, next) {
	let _id = req.params._id;

	var request = unirest.get('https://niemeyer.hackaetano.com/users/'+_id+'/matches');

	request
	.header('Accept', 'application/json')
	.end(function(response) {
		res.render('properties', response.body);
	});
});

app.listen(port, () => {
    console.log(`Everest is running at port: ${port}`);
})
