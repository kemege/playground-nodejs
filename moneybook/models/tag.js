
/**
 * MongoDB model for company.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var MoneyRecordSchema = new Schema({
	name   : { type: String, unique: true },
	time   : { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoneyRecord', MoneyRecordSchema);