var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var SeiyuuSchema = new Schema({
	name        : { type: String, unique: true },
	isMain      : Boolean,
	vadbID      : Number,
	character   : [{ type: Schema.Types.ObjectId, ref: 'Character' }],
	date        : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Seiyuu', SeiyuuSchema);