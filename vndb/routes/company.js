var Company = require('../models/company.js');
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
	res.render('addCompany', { title: 'myVNDB - 添加条目 - 公司' });
};

exports.doAdd = function(req, res) {
	var companyString = req.body.company.trim();
	var companyList = companyString.split('\n');
	for (var i = 0; i < companyList.length; i++) {
		var companyName = companyList[i].trim();
		if (companyName.length>0) {
			// put this company into db
			var company = new Company({ name: companyName });
			company.save(cb);
		};
	};
	res.send(JSON.stringify({error: 0, success: result.success, failure: result.failure}));
};