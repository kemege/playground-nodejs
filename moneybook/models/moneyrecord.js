
/**
 * MongoDB model for company.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var MoneyRecordSchema = new Schema({
	name   : { type: String, unique: true },
	amount : Number,
	memo   : String,
	date   : Date,
	income : Boolean,
	user   : { type: Schema.Types.ObjectId, ref: 'User' },
	tag    : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	time   : { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoneyRecord', MoneyRecordSchema);