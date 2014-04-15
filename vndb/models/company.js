
/**
 * MongoDB model for company.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var CompanySchema = new Schema({
	name: { type: String, unique: true }
});

module.exports = mongoose.model('Company', CompanySchema);