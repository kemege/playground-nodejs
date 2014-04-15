
/*
 * GET home page.
 */

var moneyrecord = require('../models/moneyrecord');
var user = require('../models/user');
var tag = require('../models/tag');

exports.showAdd = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.doAdd = function(req, res){
  res.render('index', { title: 'Express' });
};