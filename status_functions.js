	var addStatusEffects = {
		Sleep: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			Halpert.status = new Status( "Sleep", Evana );
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
			Halpert.status = new Status( "Yawn", 2 );
			refresh(Halpert.other, Halpert.name+" is starting to get drowsy!");
		},
		Flinch: function(Halpert) {
			Halpert.disabled = true;
			Halpert.status = new Status( "Flinch", 1 );
		},
		Taunt: function(Halpert) {
			Halpert.status = new Status( "Taunt", 2 );
			refresh(Halpert.other, Halpert.name+" is effected by Taunt!");
		},
		LeechSeed: function(Halpert) {
			Halpert.status = new Status( "Leech Seed", false );
			refresh(Halpert.other, Halpert.name+" is now seeded!");
		},
		MagicCoat: function(Halpert) { //a helpful status "aliment"
			Halpert.status = new Status( "Magic Coat", 1 );
		}
	};

	var removeStatusEffects = {
		Sleep: function(Halpert) {
			Halpert.status = null;
			refresh(Halpert, Halpert+name+" woke up!");
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
			addStatusEffects["Sleep"](Halpert);
		},
		Flinch: function(Halpert) {
			Halpert.disabled = false;
			Halpert.status = null;
		},
		Taunt: function(Halpert) {
			Halpert.status = null;
		},
		LeechSeed: function(Halpert) {
			Halpert.status = null;
		},
		MagicCoat: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Magic Coat", Evana );
			return Gizzi;
		}
	};

	var turnStatusEffects = {
		Sleep: function(Halpert) {
			if ( turn - Halpert.status.started == Halpert.status.duration ) {
			    removeStatusEffects["Sleep"](Halpert);
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
			    refresh(Halpert, Halpert.name+" is paralyzed!");
			}
			return (Halpert.health < 1) ? true : false;
		},
		Yawn: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Flinch: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Taunt: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		LeechSeed: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		MagicCoat: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		}
	};

	