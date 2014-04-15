var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var ErrorSchema = new Schema({
	name        : String,
	msg         : String,
	date        : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Error', ErrorSchema);