var Seiyuu = require('../models/seiyuu.js');
var Error = require('../models/error.js');

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
	res.render('addSeiyuu', { title: 'myVNDB - 添加条目 - 声优' });
};

exports.doAdd = function(req, res) {
	var seiyuuString = req.body.seiyuu.trim();
	var seiyuuList = seiyuuString.split('\n');
	for (var i = 0; i < seiyuuList.length; i++) {
		var seiyuuData = seiyuuList[i].trim();
		if (seiyuuData.length>0) {
			// put this company into db
			var temp = seiyuuData.split(',')
			var seiyuu = new Seiyuu({
				name: temp[0],
				vadbID: temp[1],
				isMain: parseInt(temp[2])!=0
			});
			seiyuu.save(cb);
		};
	};
	res.send(JSON.stringify({error: 0}));
};