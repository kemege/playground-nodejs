var Blob = require('../models/blob.js');

function cb(err) {
	var error = new Error({
		name : err.name,
		msg  : err.err,
		date : new Date()
	});
	error.save();
	res.send(JSON.stringify({ error: 1, msg: err.err }));
}

exports.download = function (req, res) {
	var id = req.query.key;
	Blob.findOne({ _id: id }, function(err, doc) {
		if (err) {
			cb(err);
		} else {
			res.contentType(doc.mime);
			res.end(doc.body.toString('utf8'), 'binary');
		};
		
	});
}
