var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CreatureSchema = new Schema({
	imageUrl: String,
	creatureType: String,
	description: String,
	madlib: String
});

var Creature = mongoose.model('Creature', CreatureSchema);

module.exports = Creature;
