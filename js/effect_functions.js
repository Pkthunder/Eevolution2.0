/* This file contains all Status Effect functions, stored in 3 large literal objects for easy indexing/calling */

// var addStatusEffects = {
// 	Yawn: function(Halpert) {
// 		Halpert.effects.push( new Effect('Yawn', 1, null) )
// 		refresh(Halpert.other, Halpert.name+" is starting to get drowsy!");
// 	}
// 	Flinch: function(Halpert) {
// 		Halpert.effects.push( new Effect('Flinch', 1, 'preventAttacking') );
// 	}
// 	Taunt: function(Halpert) {
// 		Halpert.effects.push( new Effect('Taunt', 2, 'preventAttacking') );
// 		refresh(Halpert.other, Halpert.name+" is effected by Taunt!");
// 	}
// 	LeechSeed: function(Halpert) {
// 		Halpert.effects.push( new Effect('LeechSeed', false, null) );
// 		refresh(Halpert.other, Halpert.name+" is now seeded!");
// 	}
// 	Confusion: function(Halpert) {
// 		var Evana = Math.floor(Math.random()*4) + 1;
// 	    Halpert.effects.push( new Effect('Confusion', Evana, null) ); 
// 	    refresh(Halpert.other, Halpert.name+" has become Confused!");
// 	}
// 	MagicCoat: function(Halpert) {
// 		Halpert.effects.push( new Effect('MagicCoat', 1, 'preventStatus') );
// 	}
// 	Substitute: function(Halpert) {
// 		Halpert.effects.push( new Effect('Substitute', 1, 'preventStatus') );
// 	}
// };