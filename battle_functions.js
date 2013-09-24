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
    var Gizzi = attacker.move.acc;
    var Evana = Math.floor(Math.random()*100) + 1;
    return (Evana <= Gizzi) ? true : false;
}

//check for death to prevent zombie attacks
function preventZombieAtk(attacker)
{
    if (attacker.health < 1 ) {
        console.log("Exiting Battle Phase for "+attacker.name+" - preventing zombie attack");
        return true;
    }
    return false;
}
    //disabled check
function disabledCheck(attacker)
{
    if (attacker.disabled) {
        if (attacker.status.type == "Flinch")
            refresh(attacker, attacker.name+" Flinched!");
        else
            refresh(attacker, attacker.name+" is unable to attack!");
        return true;
    }
    return false;
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

function runBattleSequence(attacker) {
    console.log("Entering Battle Phase for "+attacker.name);
    
    var dmg = -1;
    var done = false; //a bool to tell if the status/effect should end the battle phase
    
    //run pre-effect
    if (attacker.move.pre) {
        console.log("Running pre-effect...");
        //runEffect(attacker);
    }
    //calculate damage
    if (attacker.move.pwr != null) {
        if ( !hitCheck(attacker) ) {
            console.log(attacker.name +" missed");
            refresh( attacker, "but "+attacker.name+" missed the target!");
            return;
        }
        dmg = calcDmg(attacker);
        //Run post-effect after an damaging attack
        if (attacker.move.pre == false) {
            console.log("Running post-effect WITH attack...");
            //runEffect(attacker);
        }
        //Record the Calculated Damage
        recordDmg(attacker.other, dmg);
    }
    //run post-effect without a damaging attack
    if (dmg == -1 && attacker.move.pre == false) {
        console.log("Running post-effect AFTER attack");
        if ( !hitCheck(attacker) ) {
            console.log(attacker.name +" missed");
            refresh( attacker, "but it failed to connect!");
            return;
        }
        done = runEffect(attacker);
    }

    //Temp Catch All
    if (dmg < 0 && attacker.move.pwr == null && done == false) {
        refresh( attacker, "The move failed because I haven't added it yet. Sorry!");   
    }

    console.log("Battle Sequence Ended for "+attacker.name);
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
    //First attacker's turn:
    // if (runAliment(first)) {
    //     return;
    // }
    runAliment(first);
    setTimeout( function() {
        if (!preventZombieAtk(first) && !disabledCheck(first)) {
            refresh(first, first.name + " uses " + first.move.name);
            setTimeout( function() {
                runBattleSequence(first);   
            }, 1000);
        }
    },1000);
    //Second Attacker's turn:
    //run the Sequence - delay second sequence for better UX
    setTimeout( function() {
        if (second.health > 0 && first.health > 0) {
            // if (runAliment(second)) {
            //     return;
            // }
            runAliment(second);
            setTimeout( function() {
                if (!preventZombieAtk(second) && !disabledCheck(second)) {
                    refresh(second, second.name + " uses " + second.move.name);
                    setTimeout(function() {
                        runBattleSequence(second);
                    }, 1000); 
                }
            }, 1000);
        }
    }, 2750);
}