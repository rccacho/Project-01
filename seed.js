// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var sampleUsers = [];

sampleUsers.push({
	name: "Frodo",
	city: "The Shire",
	age: 50,
	gender: "Male",
	favoriteColor: "blue",
	favoriteFood: "stew",
	creature: "Hobbit"
});
sampleUsers.push({
	name: "Pippin",
	city: "The Shire",
	age: 28,
	gender: "Male",
	favoriteColor: "yellow",
	favoriteFood: "bread",
	creature: "Hobbit"
});

var sampleCreatures = [];

sampleCreatures.push({
	imageUrl: "https://i.ytimg.com/vi/j-CtdZVZbcI/maxresdefault.jpg",
	creatureType: "Hobbit",
	description: "Hobbits are small creatures that can be mistaken for young children. They love comfort and food and a good pipe. Although not accustomed to adventure, they can be both clever and surprisingly courageous, and also make great thieves as they are quiet and can sneak around unnoticed.",
	madlib: ` <div class='madlib'>
	<p>Behold, \${mainUser.name} the playful Hobbit! \${mainUser.name} was a curious little fellow who one day went away from \${mainUser.city}, left \${mainUser.pronoun} \${mainUser.favoriteFood} half eaten, grabbed \${mainUser.pronoun} \${mainUser.favoriteColor} cloak, and went on an adventure! Later on, \${mainUser.name} regretted having left the half-eaten \${mainUser.favoriteFood}.</p>
	 </div>`
});

sampleCreatures.push({
  imageUrl: "https://s-media-cache-ak0.pinimg.com/originals/10/db/c3/10dbc3ef1d58f4ff611ec9bfc650a3d2.jpg",
  creatureType: "Human",
  description: "Also know as the race of Men, humans are proud, ambitious creatures. They can be very courageous and take pride in strength and honor. However, they can get a bit power-hungry.",
  madlib: `<div class='madlib'>
	<p>Behold, \${mainUser.name} the noble Human! \${mainUser.name} was a brave warrior who one day went away from \${mainUser.city}, left \${mainUser.pronoun} \${mainUser.favoriteFood} half eaten, grabbed \${mainUser.pronoun} \${mainUser.favoriteColor} cloak, and defended \${mainUser.pronoun} people's honor!</p>
	 </div>`
});

sampleCreatures.push({
  imageUrl: "http://3.bp.blogspot.com/_HqZZZbDsO7I/S0JR-JOGcDI/AAAAAAAAAjI/gvC5eEv4sKo/s320/160306-bigthumbnail.jpg",
  creatureType: "Elf",
  description: "Tall, fair, and graceful, these creatures can also be fierce warriors. They are immortal, except when they are killed. So try not to die..",
  madlib: `<div class='madlib'>
	<p>Behold, \${mainUser.name} the wise Elf! \${mainUser.name} was an enlightened soul who one day went away from \${mainUser.city}, packed \${mainUser.pronoun} \${mainUser.favoriteFood} for later, grabbed \${mainUser.pronoun} \${mainUser.favoriteColor} cloak, and journeyed to save Middle Earth! Later on, \${mainUser.name} was glad to have remembered the \${mainUser.favoriteFood}.</p>
	 </div>`
});

sampleCreatures.push({
  imageUrl: "https://s-media-cache-ak0.pinimg.com/originals/f4/65/ec/f465ec9e89afacbabb9d8a051fe1b00e.jpg",
  creatureType: "Dwarf",
  description: "Kings under the mountain, these creatures are stout, stubborn, and strong. Not to mention a preoccupation with shiny things.",
  madlib: `<div class='madlib'>
	<p>Behold, \${mainUser.name} the mighty Dwarf! \${mainUser.name} was a boistrous chap who one day went away from \${mainUser.city}, left \${mainUser.pronoun} \${mainUser.favoriteFood} half eaten, grabbed \${mainUser.pronoun} \${mainUser.favoriteColor} cloak, and went searching for all that glitters!</p>
	 </div>`
});

sampleCreatures.push({
  imageUrl: "http://vignette2.wikia.nocookie.net/lotr/images/f/fd/Radagast_and_Gandalf_2.jpg",
  creatureType: "Wizard",
  description: "Wizards are long-lived and wise. They value knowledge and are very powerful.",
  madlib: `<div class='madlib'>
	<p>Behold, \${mainUser.name} the wise Wizard! \${mainUser.name} was a skilled magician who one day went away from \${mainUser.city}, first taking time to finish \${mainUser.pronoun} \${mainUser.favoriteFood}, then grabbed \${mainUser.pronoun} \${mainUser.favoriteColor} cloak, and set a plan in motion!</p>
	 </div>`
});

sampleCreatures.push({
  imageUrl: "http://shabier.com/ent/ent-018.jpg",
  creatureType: "Ent",
  description: "Shepherds of the forest, these creatures look like trees and were created to protect the forests. Despite being slow in speech and patient beings, they are strong and can be deadly if angered.",
  madlib: `<div class='madlib'>
	<p>Behold, \${mainUser.name} the steadfast Ent! \${mainUser.name} was an immovable force, who remained as always in \${mainUser.city}, enjoyed \${mainUser.pronoun} \${mainUser.favoriteFood}, didn't dream of grabbing \${mainUser.pronoun} \${mainUser.favoriteColor} cloak or going on an adventure!</p>
	 </div>`
});


//Template from Books App to remove previous list and rerender the new list
db.Creature.remove({}, function(err, creatures) {
  console.log('removed all creatures');
  db.Creature.create(sampleCreatures, function(err,creatures){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all creatures');
    console.log("created", creatures.length, "creatures");


    db.User.remove({}, function(err, users){
      console.log('removed all users');
      sampleUsers.forEach(function (userData) {
        var user = new db.User({
          name: userData.name,
          city: userData.city,
		  age: userData.age,
		  gender: userData.gender,
		  favoriteColor: userData.favoriteColor,
		  favoriteFood: userData.favoriteFood
        });
        db.Creature.findOne({creatureType: userData.creature}, function (err, foundCreature) {
          console.log('found creature ' + foundCreature.creatureType + ' for user ' + user.name);
          if (err) {
            console.log(err);
            return;
          }
          user.creature = foundCreature;
          user.save(function(err, savedUser){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedUser.creature + ' by ' + foundCreature.creatureType);
          });
        });
      });
    });

  });
});
