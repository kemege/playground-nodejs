
/*
 * GET home page.
 */

var Character = require('../models/character.js');
var Error = require('../models/error.js');
var Blob = require('../models/blob.js');
var Seiyuu = require('../models/seiyuu.js');
var Game = require('../models/game.js');
var Company = require('../models/company.js');

function cb(err) {
	var error = new Error({
		name : err.name,
		msg  : err.err,
		date : new Date()
	});
	error.save();
	res.send(JSON.stringify({ error: 1, msg: err.err }));
}

exports.game = function(req, res) {
	
};

exports.showAdd = function(req, res) {
	var companyList = Company.find({}, function(err, docs) {
		if (!err){
			res.render('addGame', { 
				title: 'myVNDB - 游戏 - 添加条目',
				companyList: docs
			});
		} else {
			cb(err);
		};
	});

	
};

exports.doAdd = function(req, res) {
	var game = new Game({
		title: req.body.title,
		releaseDate: req.body.releaseDate,
		startDate: req.body.startDate,
		finishDate: req.body.finishDate,
		icon: new Buffer(req.body.icon),
		poster: new Buffer(req.body.poster),
		vadb: req.body.vadb,
		vndb: req.body.vndb,
		egs: req.body.egs,
		genre: req.body.genre,
		playingTime: req.body.playingTime,
		attachments: req.body.attachments,
		memo: req.body.memo,
		hidden: req.body.hidden == undefined
	});
	game.save(function (err) {
		if (err) {
			cb(err);
		} else {
			// set company info
			Company.findOne({ name: req.body.company }, function (err, doc) {
				game.company = doc;
			});
			// add characters
			characters = req.body.characters.split(',');
			for (var i = 0; i < characters.length; i++) {
				(function (t) {
					game.characters.push(characters[i]);
				})(i);
			};
			game.save(cb);
			res.send(JSON.stringify({ error: 0 }));
		};
	});
};