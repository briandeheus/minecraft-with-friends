var fs     = require('fs');
var config = require('../config');

exports.addToList = function (playerData, cb) {

	fs.readFile(config.whitelist, function (error, data) {
		
		if (error) {

			console.error('Something went wrong reading the whitelist file:', error);
			return cb('Something went quite awry');

		}

		var whitelist = JSON.parse(data.toString());

		for (var i = 0, l = whitelist.length; i < l; i++) {

			var player = whitelist[i];

			if (playerData.name === player.name) {

				cb('You already have access to this server!');
				return;

			}

		}

		var playerId    = playerData.id;
		var formattedId = [playerId.slice(0, 8), playerId.slice(8, 12), playerId.slice(12, 16), playerId.slice(16, 20), playerId.slice(20,32)]
		formattedId     = formattedId.join('-');

		// TODO: Right now we store the ID, not the UUID. This means that if the player changes his/her name he/she is fucked.
		whitelist.push({
			uuid: formattedId,
			name: playerData.name
		});

		console.log(formattedId);
		
		fs.writeFile(config.whitelist, JSON.stringify(whitelist), function (error) {

			if (error) {

				console.error('Something went wrong writing the whitelist file:', error);
				return cb('Something did not go as planned.');

			}

			cb();

		});
		
	});

}