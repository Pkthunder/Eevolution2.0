//All effects of moves
var moveEffects = {
//Jolteon
	Yawn: function(Beasley) {
	    if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
	        Beasley.other.status = null;
	        refresh(Beasley.other, Beasley.other.name+" reflected Yawn back at "+Beasley.name);
	        if (Beasley.other.status == null ) {
	            addStatusEffects["Yawn"](Beasley);   
    	    }
    		else {
    		    refresh(Beasley, "but it failed!");
    	    }
    	    return true;
	    }
		if (Beasley.other.status == null) {
		    addStatusEffects["Yawn"](Beasley.other);
		}
		else {
		    refresh(Beasley, "but it failed!")   
		}
		return true;
	},
	Discharge: function(Beasley) {
	    var Evana = Math.floor(Math.random()*100) + 1;
        if ( Evana <= 50 ) {
            if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
    	        Beasley.other.status = null;
    	        refresh(Beasley.other, Beasley.other.name+" reflected Paralysis back at "+Beasley.name);
    	        if (Beasley.other.status == null ) {
    	            addStatusEffects["Paralysis"](Beasley);   
        	    }
        		else {
        		    refresh(Beasley, "but it failed!");
        	    }
        	    return true;
    	    }
	        if ( Beasley.other.status == null ) {
                addStatusEffects["Paralysis"](Beasley.other);
            }
	    }
		return true;
	},
	ChargeBeam: function(Beasley) {
		var Evana = Math.floor(Math.random()*100) + 1;
        if ( Evana <= 100 ) {
            if ( modAttack(Beasley, 1) ) {
    		    refresh(Beasley, Beasley.name+"'s attack rose!");   
    		}
    		else {
    		    refresh(Beasley, "but it failed!");
	    	}
        }
		return true;
	},
/////////////////////////////////////////////////
//Vaporeon
	Wish: function(Beasley) {
		var heal = Math.round(Beasley.original_health * .5);
		Beasley.health = Math.round(Beasley.health + heal);
		if ( Beasley.health > Beasley.original_health ) {
		    heal = heal - (Beasley.health - Beasley.original_health);
		    Beasley.health = Beasley.original_health;
		}
		updateHealthBar(Beasley);
		refresh(Beasley, Beasley.name+" healed for "+heal);
		return true;
	},
	Flail: function(Beasley) {
	    var Evana = (48 * Beasley.health) / Beasley.original_health;
	    switch(true) {
	        case Evana > 32:
	            Beasley.move.pwr = 20;
	            break;
	        case Evana <= 32 && Evana >= 17:
	            Beasley.move.pwr = 40;
	            break;
	        case Evana <= 16 && Evana >= 10:
	            Beasley.move.pwr = 80;
	            break;
	        case Evana <= 9 && Evana >= 5:
	            Beasley.move.pwr = 100;
	            break;
	        case Evana <= 4 && Evana >= 2:
	            Beasley.move.pwr = 150;
	            break;
	        case Evana <= 1:
	            Beasley.move.pwr = 200;
	            break;
	    }
		return true;
	},
	WaterPulse: function(Beasley) {
	    var Evana = Math.floor(Math.random()*100) + 1;
        if ( Evana <= 30 ) {
            if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
    	        Beasley.other.status = null;
    	        refresh(Beasley.other, Beasley.other.name+" reflected Confusion back at "+Beasley.name);
    	        if (Beasley.other.status == null ) {
    	            addStatusEffects["Confusion"](Beasley);   
        	    }
        		else {
        		    refresh(Beasley, "but it failed!");
        	    }
        	    return true;
    	    }
	        if ( Beasley.other.status == null ) {
                addStatusEffects["Confusion"](Beasley.other);
            }
	    }
	    return true;
	},
	AuoraBeam: function(Beasley) {
	    var Evana = Math.floor(Math.random()*100) + 1;
        if ( Evana <= 30 ) {
            if ( modAttack(Beasley.other, -1) ) {
    		    refresh(Beasley, Beasley.other.name+"'s attack fell!");   
    		}
        }
		return true;
	},
////////////////////////////////////////////////
//Flareon
	Facade: function(Beasley) {
		if ( Beasley.status != null )
			Beasley.move.pwr = Beasley.move.pwr * 2;
		return true;
	},
	FireFang: function(Beasley) {
		var Evana = Math.floor(Math.random()*100) + 1;
        if ( Evana <= 20 ) {
            addStatusEffects["Flinch"](Beasley.other);
        }
		return true;
	},
	WilOWisp: function(Beasley) {
	    if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
	        Beasley.other.status = null;
	        refresh(Beasley.other, Beasley.other.name+" reflected Yawn back at "+Beasley.name);
	        if (Beasley.other.status == null ) {
	            addStatusEffects["Yawn"](Beasley);   
    	    }
    		else {
    		    refresh(Beasley, "but it failed!");
    	    }
    	    return true;
	    }
		if (Beasley.other.status == null ) {
	        addStatusEffects["Burn"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	FlameCharge: function(Beasley) {
		var Evana = Math.floor(Math.random()*100) + 1;
        if ( Evana <= 100 ) {
            if ( modSpeed(Beasley, 1) ) {
    		    refresh(Beasley, Beasley.name+"'s speed rose!");   
    		}
        }
		return true;
	},
///////////////////////////////////////////////
//Espeon
	CalmMind: function(Beasley) {
		var atk = modAttack(Beasley, 1);
		var def = modDefense(Beasley, 1); //returns true or false
		
		if ( atk ) {
		    refresh(Beasley, Beasley.name+"'s attack rose!");
    		//counts stat gains for Stored Power's effect
    		if ( Beasley.stages.bonusCount == undefined ) {
    			Beasley.stages.bonusCount=1;
    		}
    		else {
    			Beasley.stages.bonusCount++;
    		}
		}
		if ( def ) {
    		refresh(Beasley, Beasley.name+"'s defense rose!");
    		//counts stat gains for Stored Power's effect
    		if ( Beasley.stages.bonusCount == undefined ) {
    			Beasley.stages.bonusCount=1;
    		}
    		else {
    			Beasley.stages.bonusCount++;
		    }
		}
		if (!atk && !def) {
		    refresh(Beasley, "but it failed!");
		}
		return true;
	},
	MagicCoat: function(Beasley) {
	    addStatusEffects["MagicCoat"](Beasley);
	    refresh(Beasley, Beasley.name+" is protecting itself!");
		return true;
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
	    if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
	        Beasley.other.status = null;
	        refresh(Beasley.other, Beasley.other.name+" reflected Taunt back at "+Beasley.name);
	        if (Beasley.other.status == null ) {
	            addStatusEffects["Taunt"](Beasley);   
    	    }
    		else {
    		    refresh(Beasley, "but it failed!");
    	    }
    	    return true;
	    }
		if (Beasley.other.status == null ) {
	        addStatusEffects["Taunt"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	Curse: function(Beasley) {
	    var atk = modAttack(Beasley, 1);
		var def = modDefense(Beasley, 1);
		var spd = modSpeed(Beasley, -1);
		
		if (atk) {
		    refresh(Beasley, Beasley.name+"'s attack rose!");
		}
		if (def) {
		    refresh(Beasley, Beasley.name+"'s defense rose!");
		}
		if (spd) {
		    refresh(Beasley, Beasley.name+"'s speed fell!");
		}
		
		if ( !atk && !def && !spd ) {
		    refresh(Beasley, "but it failed!");
		}
		return true;
	},
	Toxic: function(Beasley) {
	    if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
	        Beasley.other.status = null;
	        refresh(Beasley.other, Beasley.other.name+" reflected Poison back at "+Beasley.name);
	        if (Beasley.other.status == null ) {
	            addStatusEffects["Poison"](Beasley);   
    	    }
    		else {
    		    refresh(Beasley, "but it failed!");
    	    }
    	    return true;
	    }
	    if (Beasley.other.status == null ) {
	        addStatusEffects["Poison"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	Payback: function(Beasley) {
		if (Beasley.other.done) {
		    Beasley.move.pwr = Beasley.move.pwr * 2;
		}
		return true;
	},
//////////////////////////////////////////////
//Leafeon
	LeechSeed: function(Beasley) {
	    if (Beasley.other.status != null && Beasley.other.status.type == "MagicCoat") {
	        Beasley.other.status = null;
	        refresh(Beasley.other, Beasley.other.name+" reflected Leech Seed back at "+Beasley.name);
	        if (Beasley.other.status == null ) {
	            addStatusEffects["LeechSeed"](Beasley);   
    	    }
    		else {
    		    refresh(Beasley, "but it failed!");
    	    }
    	    return true;
	    }
		if (Beasley.other.status == null ) {
	        addStatusEffects["LeechSeed"](Beasley.other);   
	    }
		else {
		    refresh(Beasley, "but it failed!");
	    }
	    return true;
	},
	Substitute: function(Beasley) {
		//return false;
		var value = Math.round(Beasley.health*0.25);
		var percent = (value / Beasley.original_health) * 100;
		var container = Beasley.$wrapper.find(".progress-wrapper");
		var redBar = container.find('.bar.bar-danger');
		
		//Record Sacrifice Damage
		Beasley.health = Math.round(Beasley.health - value);
		updateHealthBar(Beasley);
		redBar.after('<div class="bar bar-success" style="width: 0.000001%;"></div>');
		
		//Prepare Target for Updating Health Bar Text
		var span = container.find('.bar_val');

		addStatusEffects["Substitute"](Beasley);
		Beasley.status.data = value;

		//Short Delay
		setTimeout( function() { //add '2nd health bar' on short delay for better appearence
			refresh(Beasley, Beasley.name +' made a clone of itself!');
			container.find('.bar.bar-success').css({"width" : percent+"%"});
			span.append('<span class="bar_val-green"> + ('+value+')</span>'); //Update Health Bar Text
			return true;
		 }, 600);
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
	MirrorCoat: function(Beasley) {
	    //return false;
	    if ( Beasley.other.move.pwr != null && Beasley.other.move.pwr > 0 ) {
	    	var dmgDealt = Beasley.original_health - Beasley.health;
	    	var mcoatDmg = Math.round( Beasley.other.health - (dmgDealt*1.5));
	    	Beasley.other.health = mcoatDmg;
	    	updateHealthBar(Beasley.other);
	    	refresh(Beasley, "Glaceon's Mirror Coat dealt " + mcoatDmg +" damage to "+Beasley.other.name);
	    }
	    else
	    	refresh(Beasley, "but it failed!");
	    return true;
	},
	FrostBreath: function(Beasley) {
		Beasley.move.dmgmod = true;
		return true;
	}
};