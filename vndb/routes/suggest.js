var Character = require('../models/character.js');
var Error = require('../models/error.js');
var Blob = require('../models/blob.js');
var Seiyuu = require('../models/seiyuu.js');

function cb(err) {
	var error = new Error({
		name : err.name,
		msg  : err.err,
		date : new Date()
	});
	error.save();
	res.send(JSON.stringify({ error: 1, msg: err.err }));
}

exports.suggestCharacter = function (req, res) {
	var keyword = req.query.q;
	var columns = '';
	var opts = {
		skip  : 0,
		limit : 5,
		sort  : {
			date : -1
		}
	};
	Character.find({ name: new RegExp(keyword, "i") }, columns, opts)
	.populate('seiyuu image')
	.exec(function (err, cursor) {
		if (err) {
			cb(err);
		} else {
			var results = [];
			cursor.forEach(function (entry) {
				results.push({
					id: entry._id,
					name: entry.name,
					seiyuu: entry.seiyuu.name,
					image: entry.image._id
				});
			});
			res.send(JSON.stringify({error: 0, list: results}));
		};
	});
}