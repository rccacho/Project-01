var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	city: String,
	age: Number,
	gender: String,
	favoriteColor: String,
	favoriteFood: String,
	weaponName: String,
	creature: {
    	type: Schema.Types.ObjectId,
    	ref: 'Creature'
  	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
