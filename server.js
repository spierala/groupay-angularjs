// modules
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// config file
var db = require('./config/db');

// set port
var port = process.env.PORT || 8080;

// connect db
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {console.log('db connected')});
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/dist')); // set the static files location /public/img will be /img for users

// routes
require('./server/routes')(app); // configure routes

// start app
app.listen(port);										// startup app at http://localhost:8080
console.log('Server is running on port ' + port);
exports = module.exports = app; 						// expose app

