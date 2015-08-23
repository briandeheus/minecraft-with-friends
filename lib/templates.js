var async     = require('async');
var fs        = require('fs');

var templates = [
	{
		name:     'base',
		location: './templates/index.html'
	}
];

exports.TEMPLATES = {};

exports.init = function (cb) {

	async.eachSeries(templates, function (template, nextTemplate) {

		fs.readFile(template.location, function (error, data) {

			if (error) {
				cb(error);
				return;
			}

			exports.TEMPLATES[template.name] = data.toString('utf-8');
			nextTemplate();

		});

	}, cb);

}