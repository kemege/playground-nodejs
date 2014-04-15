var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var CharacterSchema = new Schema({
	name        : String,
	romaji      : String,
	image       : { type: Schema.Types.ObjectId, ref: 'Blob' },
	seiyuu      : { type: Schema.Types.ObjectId, ref: 'Seiyuu' },
	game        : [{ type: Schema.Types.ObjectId, ref: 'Game' }],
	date        : { type: Date, default: Date.now }
});

CharacterSchema.index({
	name  : 1,
	image : 1
}, {
	unique: true
});

module.exports = mongoose.model('Character', CharacterSchema);