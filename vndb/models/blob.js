var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var BlobSchema = new Schema({
	name        : String,
	body        : Buffer,
	mime        : String,
	date        : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blob', BlobSchema);