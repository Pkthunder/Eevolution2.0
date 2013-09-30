function speedCheck() {
	if ( play1.speed == play2.speed ) {
		var coin = Math.floor(Math.random()*2);
		return ( coin == 0 ) ? play1 : play2;
	}
	return ( play1.speed > play2.speed ) ? play1 : play2;
}

function priorityCheck() {
	if ( play1.move.priority == play2.move.priority ) {
		var fastest = speedCheck();
		return fastest;
	}
	return (play1.move.priority > play2.move.priority) ? play1 : play2;
}

function hitCheck( attacker ) {
    if ( attacker.move.acc != null ) {
        var Gizzi = attacker.move.acc;
        var Evana = Math.floor(Math.random()*100) + 1;
        return (Evana <= Gizzi) ? true : false;
    }
    return true;
}

function getRandom() {
	var Evana = Math.floor(Math.random()*15) + 1;
	Evana = Evana + 85;
	console.log("RandomNumber: " +Evana);
	return Evana;
}

function calcDmg( attacker) {
	//Damage Formula according to Serebii.net
	//Damage = ((((2 * Level / 5 + 2) * AttackStat * AttackPower / DefenseStat) / 50) + 2)
				//* STAB * Weakness/Resistance * RandomNumber / 100

	var rand = getRandom();
	var Dmg = (((((42 * attacker.attack * attacker.move.pwr) / attacker.other.defense) / 50) + 2) * rand) / 100;
	return (Dmg > 0 ) ? Math.round(Dmg) : 0;
}

function recordDmg(target, damage) {
	target.health = Math.round(target.health - damage);
	refresh(target.other, target.other.name+ "'s " + target.other.move.name + " dealt " +
	        damage +" damage to "+target.name);
	updateHealthBar(target);
}

function runEffect( attacker ) {
    var Evana = attacker.move.effect;
    Evana = Evana.replace(' ','').replace(' ','');
    return moveEffects[Evana](attacker);
}

function runAliment(attacker) {
    if (attacker.status) {
        console.log("running status effect: " + attacker.status.type + " on " + attacker.name);
        return turnStatusEffects[attacker.status.type](attacker); //returns true if Aliment causes death
    }
    return false;
}

function runBattlePhase() {
	//run priority/speed checks to determine first attacker
	var first, second;
    if (play1.move.priority > 0 || play2.move.priority > 0 ) {
        first = priorityCheck();
    }
    else {
        first = speedCheck();
    }
    second = first.other;
    
    //prints the Turn # (in black i.e. the null)
    refresh(null, "--- Turn: "+turn+" --- <");
    $(document).trigger("runAliment", [first]);
}

$(document).on("Done", function( e, attacker ) {
    attacker.done = true;
    if (attacker.other.done) {
        //starts next round of 'Battle Phase'
        //if neither player has died
        if (play1.health > 0 && play2.health > 0) {
            $(document).trigger(onDamageRecorded);
        }
    }
    else {
        $(document).trigger("runAliment", [attacker.other]);
    }
});

$(document).on("runAliment", function( e, attacker ) {
    if (attacker.status != null) {
        //returns true if death is caused
        var cont = runAliment(attacker);
        if (!cont) {
            setTimeout( function() {
                $(document).trigger("stillAlive", [attacker]);
            }, 1000);
        }
    }
    else { //skips delay if no status aliment
        $(document).trigger("stillAlive", [attacker]);
    }
});

$(document).on("stillAlive", function( e, attacker ) {
    if ( attacker.health > 0 ) {
        refresh(attacker, attacker.name + " uses " + attacker.move.name);
        setTimeout( function() {
            $(document).trigger("disabledCheck", [attacker]);
        }, 1000);
    }
    else {
        setTimeout( function() {
            $(document).trigger("Done", [attacker]);
        }, 1000);
    }
});

//TODO: add Aliment/Effect difference and runEffectAliment function???

$(document).on("disabledCheck", function( e, attacker ) {
    if ( attacker.disabled ) {
        refresh(first, first.name+" is unable to attack!");
        setTimeout( function() {
            $(document).trigger("Done", [attacker]);
        }, 1000);
    }
    else {
        $(document).trigger("preCheck", [attacker]);
    }
});

$(document).on("preCheck", function( e, attacker ) {
    if ( attacker.move.pre ) {
        if (hitCheck(attacker)) {
            console.log("Running pre-effect...");
            runEffect(attacker);
        }
        else {
            console.log(attacker.name +" missed");
            refresh( attacker, "but it failed!");
        }
        setTimeout( function() {
            $(document).trigger("Done", [attacker]);
        }, 1000);
    }
    else {
        $(document).trigger("runDamage", [attacker]);
    }
});

$(document).on("runDamage", function( e, attacker) {
    if (attacker.move.pwr != null) {
        console.log("Running damage move...")
        if (!hitCheck(attacker)) {
            console.log(attacker.name +" missed");
            refresh(attacker, "but "+attacker.name+" missed the target!");
            setTimeout( function() {
                $(document).trigger("Done", [attacker]);
            }, 1000);
            return;
        }
        var dmg = calcDmg(attacker);
        //Record the Calculated Damage
        recordDmg(attacker.other, dmg);
        if (attacker.move.pre == false) { //move has an post-effect
            setTimeout( function() {
                $(document).trigger("postEffect", [attacker]);
            }, 1000);
        }
        else {
            setTimeout( function() {
                $(document).trigger("Done", [attacker]);
            }, 1000);
        }
    }
    else {
        console.log("Error - runDamage reached, but move deals no damge");
        setTimeout( function() {
            $(document).trigger("Done", [attacker]);
        }, 1000);
    }
});

$(document).on("postEffect", function( e, attacker ) {
    console.log("Running post-effect...");
    //runEffect(attacker);
    setTimeout( function() {
        $(document).trigger("Done", [attacker]);
    }, 1000);
});