
/**
 * MongoDB model for company.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var GameSchema = new Schema({
	title       : String,
	company     : { type: Schema.Types.ObjectId, ref: 'Company' },
	releaseDate : Date,
	startDate   : Date,
	finishDate  : Date,
	icon        : Buffer,
	poster      : Buffer,
	characters  : [{type: Schema.Types.ObjectId, ref: 'Character' }],
	vadb        : Number,
	vndb        : Number,
	egs         : Number,
	genre       : String,
	playingTime : Number,
	attachments : Buffer,
	memo        : String,
	hidden      : Boolean,
	date        : { type: Date, default: Date.now }
});

GameSchema.index({
	title  : 1
}, {
	unique: true
});

module.exports = mongoose.model('Game', GameSchema);
