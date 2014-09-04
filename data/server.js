var express = require('express')
	, app = module.exports = express()
	, bodyParser = require('body-parser')
  , expressValidator = require('express-validator');

function onError(error, req, res, next) {
  if (!(error && error.message)) {
    error.message = 'An unknown error as occurred';
  }

  if(error.name && error.name == 'Validation Error'){
    res.status(400).json({
      error: error.name,
      message: error.message,
      detail: error.errors
    });
  } else {
    res.status(500).json({
      error: error.name,
      message: error.message,
      detail: error.errors
    });
  }
}

app.use( bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(expressValidator());

app.use( express.static(__dirname + '/public') );

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

io = require('socket.io').listen(server);

require('./app/routes')(app);

app.use(onError);