var express   = require('express');
var config    = require('./config.json');
var templates = require('./lib/templates');

var app     = express();

app.get('/', function (req, res) {

  res.send(templates.TEMPLATES.base);

});

templates.init(function () {

	var server = app.listen(config.port, config.host, function () {

	  var host = server.address().address;
	  var port = server.address().port;

	});

});
