
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var user = require('./routes/user');
var game = require('./routes/game');
var company = require('./routes/company');
var seiyuu = require('./routes/seiyuu');
var character = require('./routes/character');
var suggest = require('./routes/suggest');
var data = require('./routes/data');
var http = require('http');
var path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var db = mongoose.connect('mongodb://localhost/vndb');

app.get('/', routes.index);
app.get('/game', game.game);
app.get('/user', user.list);
app.get('/game/add', game.showAdd);
app.post('/game/add', game.doAdd);
app.get('/company', company.list);
app.get('/company/add', company.showAdd);
app.post('/company/add', company.doAdd);
app.get('/seiyuu', seiyuu.list);
app.get('/seiyuu/add', seiyuu.showAdd);
app.post('/seiyuu/add', seiyuu.doAdd);
app.get('/character', character.list);
app.get('/character/add', character.showAdd);
app.post('/character/add', character.doAdd);
app.get('/character/suggest', suggest.suggestCharacter);
app.get('/data', data.download);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
