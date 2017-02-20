var db = require('../models');

//FIND ALL users and return as JSON
function index(req, res){
  db.User.find({})
    .populate('creature')
    .exec(function(err, users) {
      if (err){
      console.log(err);
      res.sendStatus(204);
    }
    res.json(users);
  });
}

//FIND one user by id and return as JSON
function search(req,res){
  db.User.findById(req.params.id)
  .populate('creature')
  .exec(function(err, user){
    if (err){
      console.log(err);
      res.sendStatus(204);
    }
    res.json(user)
  });
}

//CREATE one new user and save, return as JSON
function add(req,res){
  var age = parseInt(req.body.age);
  req.body.age = age;
  var newUser = new db.User({
    name: req.body.name,
    city: req.body.city,
    age: req.body.age,
    gender: req.body.gender,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
    weaponName: req.body.weaponName
  });
  db.Creature.findOne({creatureType: req.body.creature}, function(err,creature){
    if (err) {
      return console.log(err)
    }
    newUser.creature = creature;
    newUser.save(function(err,user){
      if (err){
        return console.log("save error: ",err);
      }
      res.json(user);
    });
  });

}

// UPDATE a user by id
function update(req, res) {
  //capture update data
  var age = parseInt(req.body.age);
  req.body.age = age;
  var updateData = {
    name: req.body.name,
    city: req.body.city,
    age: req.body.age,
    gender: req.body.gender,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
    weaponName: req.body.weaponName
  };
  db.Creature.findOne({creatureType: req.body.creature}, function(err,creature){
    if (err) {
      return console.log(err)
    }
    updateData.creature = creature;
  });
  // find one user by id, update it based on request body,
  // and send it back as JSON
  db.User.update({_id: req.params.id}, updateData, {new:true}, function(err, confirmation){
    if (err){return console.log("error: ", err);}
    else {
      db.User.findById(req.params.id)
      .populate('creature')
      .exec(function(err, user){
        if (err){return console.log("Error: ", err);}
        else {
          res.json(user);
        }
      });
    }
  });
}


// DELETE one user by id and return as JSON
function destroy(req, res) {
  db.User.findOneAndRemove({ _id: req.params.id }, function(err, foundUser){
    if (err){return console.log("Error: ",err);}
    else{
      res.json(foundUser);
    }
  });
}

module.exports = {
  index: index,
  search: search,
  add: add,
  destroy: destroy,
  update: update

};
