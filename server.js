const express = require('express');
const constants = require('./config/constants');

const app = express();
const exphbs  = require('express-handlebars');
const helpers = require('handlebars-helpers')();

const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = process.env.PORT || 8000;
const path = require('path');
const open = require('open');
const favicon = require('serve-favicon');
const routes = require(constants.mainDirectory + '/routes/routes');

const hbs = exphbs.create({
    partialsDir: __dirname + '/' + constants.mainDirectory + '/dev/partials'
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/' + constants.mainDirectory + '/build/'));
app.use(favicon(path.join(__dirname + '/' + constants.mainDirectory + '/build/assets/img', 'favicon.ico')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/' + constants.mainDirectory + '/dev'));
app.engine('handlebars', hbs.engine);

// routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Everest is running at port: ${port}`);
    open(`http://localhost:${port}/`);
})
