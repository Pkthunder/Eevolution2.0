$(document).("Done", function( e, attacker ) {
    attacker.done = true;
    if (attacker.other.done) {
        //starts next round of 'Battle Phase'
        //if neither player has died
        if (play1.health > 0 && play2.health > 0) {
            setTimeout( function() {
                $(document).trigger(onDamageRecorded);
            }, 1500 );
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
                $(document).trigger("disabledCheck", [attacker]);
            }, 1000);
        }
    }
    else { //skips delay if no status aliment
        $(document).trigger("disabledCheck", [attacker]);
    }
});

//TODO: add Aliment/Effect difference and runEffectAliment function???

$(document).on("disabledCheck", function( e, attacker ) {
    if ( attacker.disabled ) {
        refresh(first, first.name+" is unable to attack!");
        setTimeout( function() {
            $(document).trigger("Done", [attacker]);
        }, 1500);
    }
    else {
        $(document).trigger("preCheck", [attacker]);
    }
});

$(document).on("preCheck", function( e, attacker ) {
    if ( attacker.move.pre && attacker.move.pwr == null) {
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
        }, 1500);
    }
    else {
        $(document).trigger("runDamage", [attacker]);
    }
});

$(document).on("runDamage", function( e, attacker) {
    if (attacker.move.pwr != null) {
        console.log("Running damage move...")
        refresh(attacker, attacker.name + " uses " + attacker.move.name);
        setTimeout( function() {
            if (!hitCheck(attacker)) {
                console.log(attacker.name +" missed");
                refresh(attacker, "but "+attacker.name+" missed the target!");
                setTimeout( function() {
                    $(document).trigger("Done", [attacker]);
                }, 1500);
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
                }, 1500);
            }
        }, 1000);
    }
    else {
        console.log("Error - runDamage reached, but move deals no damge");
        setTimeout( function() {
            $(document).trigger("Done", [attacker]);
        }, 1500);
    }
});

$(document).on("postEffect", function( e, attacker ) {
    console.log("Running post-effect...");
    runEffect(attacker);
    setTimeout( function() {
        $(document).trigger("Done", [attacker]);
    }, 1500);
});


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
    $(document).trigger("runAliment", [attacker]);
    
    // function runBattleSequence(attacker) {
//     console.log("Entering Battle Phase for "+attacker.name);
    
//     var dmg = -1;
//     var done = false; //a bool to tell if the status/effect should end the battle phase
    
//     //run pre-effect
//     if (attacker.move.pre) {
//         console.log("Running pre-effect...");
//         done = runEffect(attacker);
//     }
//     //calculate damage
//     if (attacker.move.pwr != null) {
//         dmg = 0;
//         if ( !hitCheck(attacker) ) {
//             console.log(attacker.name +" missed");
//             refresh( attacker, "but "+attacker.name+" missed the target!");
//             return;
//         }
//         dmg = calcDmg(attacker);
//         //Record the Calculated Damage
//         recordDmg(attacker.other, dmg);
//     }
//     //run post-effect without a damaging attack
//     if (attacker.move.pre == false) {
//         console.log("Running post-effect...");
//         if ( dmg == -1 ) {
//             //only check for hit/miss if the attack isn't a damage move
//             //dmg will only be -1 if the move isn't a damage move
//             if ( !hitCheck(attacker) ) {
//                 console.log(attacker.name +" missed");
//                 refresh( attacker, "but it failed!");
//                 return;
//             }
//         }
//         if ( dmg != 0 ) {
//             //a check to see if the damage move missed (therefore the effects missed)
//             //a damage move will only be 0 if the move ran, but missed
//             done = runEffect(attacker);
//         }
//     }

//     //Temp Catch All
//     if (dmg < 0 && attacker.move.pwr == null && done == false) {
//         refresh( attacker, "The move failed because I haven't added it yet. Sorry!");   
//     }
    
//     console.log("Battle Sequence Ended for "+attacker.name);
// }

//     //First's Turn
//     if (runAliment(first)) {
//         return;
//     }
//     setTimeout( function() {
//         //check for death to prevent zombie attacks
//         if (first.health < 1 ) {
//             console.log("Exiting Battle Phase for "+first.name+" - preventing zombie attack");
//             return;
//         }
//         //disabled check
//         if (first.disabled) {
//             if (first.status.type == "Sleep") {
//                 refresh(first, first.name+" is sleeping!");
//                 return;
//             }
//             refresh(first, first.name+" is unable to attack!");
//             return;
//         }
//         refresh(first, first.name + " uses " + first.move.name);
//         setTimeout( function() {
//             runBattleSequence(first);   
//         }, 1000);
//     }, 1000);
    
//     //Second's Turn
//     setTimeout( function() {     //run the Sequence - delay second sequence for better UX
//         if (runAliment(second)) {
//             return;
//         }
//         setTimeout( function() {
//             //check for death to prevent zombie attacks
//             if (second.health < 1 ) {
//                 console.log("Exiting Battle Phase for "+second.name+" - preventing zombie attack");
//                 return;
//             }
//             //disabled check
//             if (second.disabled) {
//                 if (second.status.type == "Sleep") {
//                     refresh(second, second.name+" is sleeping!");
//                     return;
//                 }
//                 if (second.status.type == "Confusion") {
//                     return;
//                 }
//                 refresh(second, second.name+" is unable to attack!");
//                 return;
//             }
//             refresh(second, second.name + " uses " + second.move.name);
//             setTimeout(function() {
//                 runBattleSequence(second);
//             }, 1000); 
//         }, 1000);
//     }, 2750);
// }
