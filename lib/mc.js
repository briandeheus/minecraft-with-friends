var request = require('request');

exports.findID = function (username, cb) {

	request.get('https://api.mojang.com/users/profiles/minecraft/' + username, function (error, data) {

		if (error) {

			console.error('Something bad happened when looking up a Minecraft player:', username, error);
			cb('An unknown error occured.');
			return;

		}

		if (data.body === '') {

			cb('We could not find this user in the database.');
			return;
			
		}

		//TODO: more sanity checking...
		cb(null, JSON.parse(data.body));

	});

}