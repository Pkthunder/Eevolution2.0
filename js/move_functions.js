//All effects of moves
var moveEffects = {
//Jolteon
	Yawn: function(Beasley) {
		if (Beasley.other.status == null || Beasley.other.status.type != "Yawn") {
		    addStatusEffects["Yawn"](Beasley.other);
		}
		else {
		    refresh(Beasley, "but it failed!")   
		}
	},
	Discharge: function(Beasley) {
		return false;
	},
	ChargeBeam: function(Beasley) {
		return false;
	},
/////////////////////////////////////////////////
//Vaporeon
	Wish: function(Beasley) {
		return false;
	},
	Flail: function(Beasley) {
		return false;
	},
	WaterPulse: function(Beasley) {
		return false;
	},
	AuoraBeam: function(Beasley) {
		return false;
	},
////////////////////////////////////////////////
//Flareon
	Facade: function(Beasley) {
		if ( Beasley.status != null )
			Beasley.move.pwr = Beasley.move.pwr * 2;
		return false;
	},
	FireFang: function(Beasley) {
		return false;
	},
	WilOWisp: function(Beasley) {
		if (Beasley.other.status == null ) {
	        addStatusEffects["Burn"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	FlameCharge: function(Beasley) {
		return false;
	},
///////////////////////////////////////////////
//Espeon
	Swift: function(Beasley) {
		return false;
	},
	CalmMind: function(Beasley) {
		//target, stage_ptr, stat_ptr, orig_ptr, value
		modifyStat(Beasley.stages.attack, Beasley.attack, Beasley.stages.original_attack, 1);
		refresh(Beasley, Beasley.name+"'s attack rose!");
		modifyStat(Beasley.stages.defense, Beasley.defense, Beasley.stages.original_defense, 1);
		refresh(Beasley, Beasley.name+"'s defense rose!");
		//counts stat gains for Stored Power's effect
		if ( Beasley.stages.bonusCount == undefined ) {
			Beasley.stages.bonusCount=1;
		}
		else {
			Beasley.stages.bonusCount+2;
		}
		return true;
	},
	MagicCoat: function(Beasley) {
		return false;
	},
	StoredPower: function(Beasley) {
		return false;
	},
///////////////////////////////////////////////
//Umbreon
	Taunt: function(Beasley) {
		if (Beasley.other.status == null ) {
	        addStatusEffects["Taunt"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	Curse: function(Beasley) {
		return false;
	},
	Toxic: function(Beasley) {
	    if (Beasley.other.status == null ) {
	        addStatusEffects["Poison"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	Payback: function(Beasley) {
		return false;
	},
//////////////////////////////////////////////
//Leafeon
	LeechSeed: function(Beasley) {
		return false;
	},
	Substitute: function(Beasley) {
		return false;
	},
	SwordsDance: function(Beasley) {
		return false;
	},
//////////////////////////////////////////////
//Glaceon
	IceShard: function(Beasley) {
		return false;
	},
	MirrorCoat: function(Beasley) {
		return false;
	},
	FrostBreath: function(Beasley) {
		return false;
	}
};