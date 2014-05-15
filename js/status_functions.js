/* This file contains 3 large literal objects for adding, removing, and turn-effects of each Status Aliment */

var addStatusAliments = {
	Sleep: function(Halpert) {
		var Evana = Math.floor(Math.random()*5) + 1;
		Halpert.status = new Status( "Sleep", Evana );
		Halpert.disabled = true;
		Halpert.disabled_msg = Halpert.name+ ' is sleeping!';
		refresh(Halpert.other, Halpert.name+" fell Asleep!");
	},
	Poison: function(Halpert) {
		Halpert.status = new Status( "Poison", false );
		Halpert.status.poisonValue = .0625 //or "1/16th"
		refresh(Halpert.other, Halpert.name+" was badly Poisoned!");
	},
	Burn: function(Halpert) {
		var Evana = Halpert.attack * .5;
		Halpert.attack = Halpert.attack - Evana;
		Halpert.status = new Status( "Burn", false );
		Halpert.status.burnValue = Evana;
		refresh(Halpert.other, Halpert.name+" is now Burnt!");
	},
	Paralysis: function(Halpert) {
		Halpert.status = new Status( "Paralysis", false );
		Halpert.status.paraValue = Halpert.speed;
		Halpert.speed = 0;
		refresh(Halpert.other, Halpert.name+" was struck by Paralysis!");
	},
	Yawn: function(Halpert) {
		Halpert.status = new Status( "Yawn", 1 );
		refresh(Halpert.other, Halpert.name+" is starting to get drowsy!");
	},
	Flinch: function(Halpert) {
		Halpert.status = new Status( "Flinch", 1 );
	},
	Taunt: function(Halpert) {
		Halpert.status = new Status( "Taunt", 2 );
		refresh(Halpert.other, Halpert.name+" is effected by Taunt!");
	},
	LeechSeed: function(Halpert) {
		Halpert.status = new Status( "LeechSeed", false );
		refresh(Halpert.other, Halpert.name+" is now seeded!");
	},
	Confusion: function(Halpert) {
	    var Evana = Math.floor(Math.random()*4) + 1;
	    Halpert.status = new Status( "Confusion", Evana); 
	    refresh(Halpert.other, Halpert.name+" has become Confused!");
	},
	MagicCoat: function(Halpert) { //a helpful status "aliment"
		Halpert.status = new Status( "MagicCoat", 1 );
	},
	Substitute: function(Halpert) {
		Halpert.status = new Status( "Substitute", false);
	}
};

var removeStatusAliments = {
	Sleep: function(Halpert) {
	    Halpert.disabled = false;
		Halpert.status = null;
		refresh(Halpert, Halpert.name+" woke up!");
	},
	Poison: function(Halpert) {
		Halpert.status = null;
	},
	Burn: function(Halpert) {
		Halpert.attack = Halpert.status.burnValue;
		Halpert.status = null;
	},
	Paralysis: function(Halpert) {
		Halpert.speed = Halpert.status.paraValue;
		Halpert.status = null;
	},
	Yawn: function(Halpert) {
        Halpert.status = null;
		addStatusAliments["Sleep"](Halpert);
	},
	Flinch: function(Halpert) {
	    if ( (turn+1) - Halpert.status.started == Halpert.status.duration) {
		    Halpert.disabled = false;
		    Halpert.status = null;
	    }
	},
	Taunt: function(Halpert) {
	    if (turn - Halpert.status.started == Halpert.status.duration) {
	        Halpert.disabled = false;
		    Halpert.status = null;
	    }
	},
	LeechSeed: function(Halpert) {
		Halpert.status = null;
	},
	Confusion: function(Halpert) {
	    Halpert.status = null;
	    Halpert.disabled = false;
	    refresh(Halpert, Halpert.name+" has broke free of confusion!")
	},
	MagicCoat: function(Halpert) {
		Halpert.status = null;
	},
	Substitute: function(Halpert) {
		Halpert.status = null;
	}
};

var turnStatusAliments = {
	Sleep: function(Halpert) {
		if ( turn - Halpert.status.started == Halpert.status.duration ) {
		    removeStatusAliments["Sleep"](Halpert);
		}
	},
	Poison: function(Halpert) {
		var Evana = Math.round(Halpert.original_health * Halpert.status.poisonValue);
		Halpert.health = Math.round(Halpert.health - Evana);
		refresh(Halpert, Halpert.name+" took "+Evana+" damage from Poison");
		updateHealthBar(Halpert);
		Halpert.status.poisonValue = Halpert.status.poisonValue + .0625; //increases by "1/16th"
		return (Halpert.health < 1) ? true : false;
	},
	Burn: function(Halpert) {
		var Evana = Math.round(Halpert.original_health * .0625); // "1/16th"
		Halpert.health = Math.round(Halpert.health - Evana);
		refresh(Halpert, Halpert.name+" was hurt by burn for "+Evana);
		updateHealthBar(Halpert);
		return (Halpert.health < 1) ? true : false;
	},
	Paralysis: function(Halpert) {
		var Evana = Math.floor(Math.random()*2);
		Halpert.disabled = false;
		if (Evana == 1) {
		    Halpert.disabled = true;
		    Halpert.disabled_msg = Halpert.name+" is paralyzed!";
		}
		return (Halpert.health < 1) ? true : false;
	},
	Yawn: function(Halpert) {
		if ( turn - Halpert.status.started == Halpert.status.duration ) {
		    Halpert.status.bTurn = true;
		}
	    if ( Halpert.status.started != turn )
		    refresh(Halpert, Halpert.name+"'s eyes are getting heavy");
	},
	Flinch: function(Halpert) {
		Halpert.disabled = true;
		Halpert.disabled_msg = Halpert.name+" flinched!";
	},
	Taunt: function(Halpert) {
		if( Halpert.move.pwr == null || Halpert.move.pwr < 1 ) {
		    Halpert.disabled = true;
		    Halpert.disabled_msg = Halpert.name+" has to use a damage move due to Taunt!";
		}
	},
	LeechSeed: function(Halpert) {
		var Evana = Math.round(Halpert.original_health * .125);
		Halpert.other.health = Halpert.other.health + Evana;
		if ( Halpert.other.health > Halpert.other.original_health ) {
		    Halpert.other.health = Halpert.other.original_health;
		}
		Halpert.health = Halpert.health - Evana;
		refresh(Halpert.other, Halpert.other.name+" absorbed "+Evana+" from "+Halpert.name);
		updateHealthBar(Halpert);
		updateHealthBar(Halpert.other);
		return (Halpert.health < 1) ? true : false;
	},
	Confusion: function(Halpert) {
	    if ( turn - Halpert.status.started == Halpert.status.duration ) {
		    removeStatusAliments["Confusion"](Halpert);
		    return;
	    }
	    //The confused condition causes a Pokémon to hurt itself in its confusion 50% of the time. 
	    //The damage is done as if the Pokémon attacked itself with a 40-power typeless physical attack.
	    // -From Bulbapedia
	    refresh(Halpert, Halpert.name+" is confused!")
	    var Evana = Math.floor(Math.random()*2);
	    Halpert.disabled = false;
	    if (Evana == 1) {
		    Halpert.disabled = true;
		    Halpert.disabled_msg = Halpert.name+" hurts itself due to confusion!";
		    var dmg = (((((42 * Halpert.attack * 40) / Halpert.defense) / 50) + 2) * 93) / 100;
		    Halpert.health = Math.round(Halpert.health - dmg);
            updateHealthBar(Halpert);
		}
		return (Halpert.health < 1) ? true : false;
	},
	MagicCoat: function(Halpert) {
		return;
	},
	Substitute: function(Halpert) {
		return;
	}
};
