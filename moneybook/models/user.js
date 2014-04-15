
/**
 * MongoDB model for company.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var UserSchema = new Schema({
	username : { type: String, unique: true },
	password : String,
	income   : Number,
	outcome  : Number,
	time     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);