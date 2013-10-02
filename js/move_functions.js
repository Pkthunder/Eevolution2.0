//All effects of moves
var moveEffects = {
//Jolteon
	Yawn: function(Beasley) {
		if (Beasley.other.status == null) {
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
	    if ( Beasley.other.status == null ) {
    		var Evana = Math.floor(Math.random()*100) + 1;
            if ( Evana <= 30 ) {
                addStatusEffects["Confusion"](Beasley.other);
            }
	    }
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
		var atk = modAttack(Beasley, 1);
		var def = modDefense(Beasley, 1); //returns true or false
		
		if ( atk && def ) {
		    refresh(Beasley, Beasley.name+"'s attack rose!");
    		refresh(Beasley, Beasley.name+"'s defense rose!");
    		//counts stat gains for Stored Power's effect
    		if ( Beasley.stages.bonusCount == undefined ) {
    			Beasley.stages.bonusCount=2;
    		}
    		else {
    			Beasley.stages.bonusCount+2;
    		}
		}
		else {
		    refresh(Beasley, "but it failed!");
		}
		return true;
	},
	MagicCoat: function(Beasley) {
		return false;
	},
	StoredPower: function(Beasley) {
		var up = Beasley.stages.bonusCount;
		if (up > 1)
			Beasley.move.pwr = (20 * up) + 20;
		return true;
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
		if ( modAttack(Beasley, 2) ) {
		    refresh(Beasley, Beasley.name+"'s attack rose sharply!");   
		}
		else {
		    refresh(Beasley, "but it failed!");
		}
		return true;
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