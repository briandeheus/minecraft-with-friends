var express    = require('express');
var bodyParser = require('body-parser')
var async      = require('async');

var config     = require('./config.json');
var templates  = require('./lib/templates');
var mc         = require('./lib/mc');
var whitelist  = require('./lib/whitelist');

var app = express();
app.use(express.static('assets')); //To load static assets without having to run a webserver
app.use(bodyParser.urlencoded({ extended: true })); //Easier form parsing.
app.use(bodyParser.json()); // Sure why not.

app.get('/', function (req, res) {

  res.send(templates.TEMPLATES.base);

});

app.post('/api/check-friendship', function (req, res) {

	var mcData = null;

	function checkFriendshipKey(next) {

		if (req.body.key !== config.friendship_key) {

			next('The friendship key is invalid.');
			return;

		}

		next();

	}

	function getMinecraftID(next) {

		mc.findID(req.body.minecraftName, function (error, data) {

			mcData = data;
			next(error);

		});

	}

	function checkIfAlreadyServerMember(next) {

		whitelist.addToList(mcData, next);

	}

	async.series([

		checkFriendshipKey,
		getMinecraftID,
		checkIfAlreadyServerMember

	], function (error) {

		if (error) {

			res.send(error);
			return;
			
		}

		res.send('Accepted. Happy playing!')

	});

});

templates.init(function () {

	var server = app.listen(config.port, config.host, function () {

	  var host = server.address().address;
	  var port = server.address().port;

	});

});
