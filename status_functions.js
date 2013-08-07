	var addStatusEffects = {
		Sleep: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			Halpert.status = new Status( "Sleep", Evana );
		},
		Poison: function(Halpert) {
			Halpert.status = new Status( "Poison", false );
		},
		Burn: function(Halpert) {
			var Evana = Halpert.attack * .5;
			Halpert.attack = Halpert.attack - Evana;
			Halpert.status = new Status( "Burn", false );
			Halpert.status.burnValue = Evana;
		},
		Paralysis: function(Halpert) {
			Halpert.status = new Status( "Paralysis", false );
			Halpert.status.paraValue = Halpert.speed;
			Halpert.speed = 0;
		},
		Yawn: function(Halpert) {
			Halpert.status = new Status( "Yawn", 2 );
		},
		Flinch: function(Halpert) {
			Halpert.disabled = true;
			Halpert.status = new Status( "Flinch", 1 );
		},
		Taunt: function(Halpert) {
			Halpert.status = new Status( "Taunt", 2 );
		},
		LeachSeed: function(Halpert) {
			Halpert.status = new Status( "Leech Seed", false );
		},
		MagicCoat: function(Halpert) { //a helpful status "aliment"
			Halpert.status = new Status( "Magic Coat", 1 );
		}
	};

	var removeStatusEffects = {
		Sleep: function(Halpert) {
			Halpert.status = null;
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
			Halpert.status = "Sleep";
		},
		Flinch: function(Halpert) {
			Halpert.disabled = false;
			Halpert.status = null;
		},
		Taunt: function(Halpert) {
			Halpert.status = null;
		},
		LeachSeed: function(Halpert) {
			Halpert.status = null;
		},
		MagicCoat: function(Halpert) {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Magic Coat", Evana );
			return Gizzi;
		}
	};

	var turnStatusEffects = {
		Sleep: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Poison: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Burn: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Paralysis: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Yawn: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Flinch: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		Taunt: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		LeachSeed: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		},
		MagicCoat: function() {
			var Evana = Math.floor(Math.random()*5) + 1;
			var Gizzi = new Status( "Sleep", Evana );
			return Gizzi;
		}
	};