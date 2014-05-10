/* This file contains all functions involved with adjusting stat stages and stat values */

//stores the multiplier value for each stat stage from -6 to +6
//array is indexed with an offset of +6 (stage number + 6 = index number)
var stageLibrary = [.25, .285, .33, .4, .5, .66, 1, 1.5, 2, 2.5, 3, 3.5, 4]

//value is the stage value, either -2, -1, 1, or 2
function modAttack( target, value ) {
    console.log("modifying "+target.name+"'s attack by "+value);
    var index = target.stages.attack+value;
    if ( index > 6  || index < -6 ) {
        console.log("Cannot raise/lower stat - its maxed out");
        return false; //did not succeed
    }
    index = index+6; //+6 for index offset of stageLibrary array
    target.attack = target.stages.original_attack * stageLibrary[index];
    target.stages.attack = target.stages.attack + value;
    return true; //succeeded
}

function modDefense( target, value ) {
    console.log("modifying "+target.name+"'s defense by "+value);
    var index = target.stages.defense+value;
    if ( index > 6  || index < -6 ) {
        console.log("Cannot raise/lower stat - its maxed out");
        return false; //did not succeed
    }
    index = index+6; //+6 for index offset of stageLibrary array
    target.defense = target.stages.original_defense * stageLibrary[index];
    target.stages.defense = target.stages.defense + value;
    return true; //succeeded
}

function modSpeed( target, value ) {
    console.log("modifying "+target.name+"'s speed by "+value);
    var index = target.stages.speed+value;
    if ( index > 6  || index < -6 ) {
        console.log("Cannot raise/lower stat - its maxed out");
        return false; //did not succeed
    }
    index = index+6; //+6 for index offset of stageLibrary array
    target.speed = target.stages.original_speed * stageLibrary[index];
    target.stages.speed = target.stages.speed + value;
    return true; //succeeded
}