/*Pokemon Object/Array*/
function Pokemon( name, attack, defense, speed, health, pokedex, $wrapper ) {
	this.name = name;
	this.attack = attack;
	this.defense = defense;
	this.speed = speed;
	this.health = health;
	this.original_health = health;
	this.pokedex = pokedex;
	this.player = null;
	this.other = {};
	this.status = null;
	this.disabled = false; //cannot attack this turn if true
	this.move = null;
	this.$wrapper = $wrapper;
}

//Move Object
//pre is a boolean representing whether the effect has
//pre-attack or post-attack effect
function Move( pwr, acc, effect, pre, name ) {
	this.pwr = pwr;
	this.acc = acc;
	this.effect = effect;
	this.pre = pre;
	this.player = null;
	this.priority = 0;
	this.name = name;
}

//Status Aliment Object
//if duration == false, that means infinite
function Status( type, duration ) {
	this.type = type;
	this.duration = duration;
	this.started = turn;
}

//	2 Player's Global variables
var play1 = new Pokemon;
var play2 = new Pokemon;
/*Global Variable Short List*/
var turn = 1;
var pick_turn = 1;

//Custom Events
var onBothPlayersReady = jQuery.Event("BothPlayersReady");
var onDamageRecorded = jQuery.Event("DamageRecorded");
var onDeath = jQuery.Event("Death");

//Global Data Arrays
var nameList = ['Jolteon', 'Vaporeon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon'];

var creationList = [
	["Jolteon", 100, 100, 100, 100],
	["Vaporeon", 100, 100, 100, 100],
	["Flareon", 100, 100, 100, 100],
	["Espeon", 100, 100, 100, 100],
	["Umbreon", 100, 100, 100, 100],
	["Leafeon", 100, 100, 100, 100],
	["Glaceon", 100, 100, 100, 100] ];

var moveList = [
	["Yawn", "Discharge", "Charge Beam", "Thunderbolt"],
	["Wish", "Flail", "Water Pulse", "Auora Beam"],
	["Facade", "Fire Fang", "Wil-O-Wisp", "Flame Charge"],
	["Swift", "Calm Mind", "Magic Coat", "Stored Power"],
	["Taunt", "Curse", "Toxic", "Payback"],
	["Leaf Blade", "Leach Seed", "Substitute", "Swords Dance"],
	["Blizzard", "Ice Shard", "Mirror Coat", "Frost Breath"] ];

//To access: var[Pokemon.pokedex][Move Number][Move Stat Info]
//Move Stat Info is organized as follows: var[][][index]
//									var[0] = Move Name/Effect
//									var[1] = Move Power
//									var[2] = Move Accuracy
//									var[3] = Pre Effect Boolean
var moveParams = [
	[ //Jolteon - 0
		["Yawn", null, null, false], //0
		["Discharge", 80, 1, false], //1
		["Charge Beam", 50, .9, false], //2
		["Thunderbolt", 95, 1] ], //3

	[ //Vaporeon - 1
		["Wish", null, null, false], //0
		["Flail", 20, 1, true], //1
		["Water Pulse", 60, 1, false], //2
		["Auora Beam", 65, 1, false] ], //3
	
	[ //Flareon - 2
		["Facade", 70, 1, true],
		["Fire Fang", 60, .95, true],
		["Wil-O-Wisp", null, null, false],
		["Flame Charge", 50, 1, false] ],
	
	[ //Espeon - 3
		["Swift", null, null, true],
		["Calm Mind", null, null, false],
		["Magic Coat", null, null,, true],
		["Stored Power", 20, 1, true] ],
	
	[ //Umbreon - 4
		["Taunt", null, null, false],
		["Curse", null, null, false],
		["Toxic", null, null, false],
		["Payback", 50, 1, true] ],
	
	[ //Leafeon - 5
		["Leaf Blade", 90, 1, null],
		["Leach Seed", null, null, false],
		["Substitute", null, null, true], //check priority
		["Swords Dance", null, null, false] ],
		
	[ //Glaceon - 6
		["Blizzard", 120, .7, null],
		["Ice Shard", 40, 1, true],
		["Mirror Coat", null, null, true], //check priority
		["Frost Breath", 40, .9, true] ] ];

/*********************************************************************************/
//Function Library

// Text Area Function
function refresh( inString ) {
	$("#textarea_wrapper ul").append( '<li> > ' + inString + '</li>' );
	if ( turn %2 == 0 || turn == 0 ) // if (even turn number, including zero)
		$("#textarea_wrapper li:last").addClass("p2t");
	else // if (odd turn number)
		$("#textarea_wrapper li:last").addClass("p1t");
}

// Health Bar Function
function deathCheck( poke ) {
    if ( poke.health < 1 ) {
        poke.health = 0;
        onDeath.who = poke;
        $(document).trigger(onDeath);
        return true;
    }
    return false;
}
function updateHealthBar( poke ) {
    if (deathCheck(poke)) {
        alert("Game Over!");
    }
	var $txt = poke.$wrapper.find(".bar_val").parent();
	$txt.find(".bar_val").remove();
	$txt.append('<span class="bar_val">' +poke.health+' / '+poke.original_health+'</span>');
	var percent = (poke.health / poke.original_health) *100;
	$txt.parent().find(".bar").css({"width" : percent+'%'});
}