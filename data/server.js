var express = require('express')
	, app = module.exports = express()
	, bodyParser = require('body-parser');

function onError(error, req, res, next) {
  if (!(error && error.message)) {
    error.message = 'An unknown error as occurred';
  }
  
  res.status(500).json({
    error: error.name,
    message: error.message,
    detail: error.errors
  });
}

app.use( bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use( express.static(__dirname + '/public') );

require('./app/routes')(app);

app.use(onError);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});