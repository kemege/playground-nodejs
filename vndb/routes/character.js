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

exports.list = function(req, res) {
	res.render('index', { title: JSON.stringify(req, function replacer(key, value) {
		if (typeof value === 'number' && !isFinite(value)) {
			return String(value);
		}
		return value;
	})
	});
};

exports.showAdd = function(req, res) {
	res.render('addCharacter', { title: 'myVNDB - 角色 - 添加条目' });
};

exports.doAdd = function(req, res) {
	var http = require('http');
	var characterString = req.body.character.trim();
	var characterList = characterString.split('\n');
	for (var i = 0; i < characterList.length; i++) {
		(function (t) {
			var characterData = characterList[i].trim();
			if (characterData.length>0) {
				// put this company into db
				var temp = characterData.split(',');
				var options = {
					host : 'vndb.kemege.com',
					port : 80,
					path : '/data?key=' + temp[3]
				};
				var request = http.get(options);
				var blobData = {};
				request.on('response', function (res) {
					var info = temp;
					var imageData = '';
					res.setEncoding('binary');
					res.on('data', function(chunk) {
						imageData += chunk;
					})
					res.on('end', function () {
						var info2 = info;
						blobData['body'] = new Buffer(imageData);
						blobData['mime'] = res.headers['content-type'];
						blobData['name'] = info2[0] + '.' + blobData['mime'].split('/')[1];
						var image = new Blob(blobData);
						image.save(function (err) {
							if (err) {
								cb(err);
							};
							var cv;
							var info3 = info2;
							var seiyuuQuery = Seiyuu.findOne({ name: info[2] }, function (err, seiyuu) {
								if (err) {
									cb(err);
								};
								var info4 = info3;
								cv = seiyuu._id;
								var character = new Character({
									name   : info4[0],
									romaji : info4[1],
									seiyuu : cv,
									image  : image._id
								});
								character.save(cb);
							});
						});
					});
				});
			};
		})(i);
	};
	res.send(JSON.stringify({error: 0}));
};