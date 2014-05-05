/*Pokemon Object/Array*/
function Pokemon( name, attack, defense, speed, health, pokedex, $wrapper ) {
	this.name = name;
	this.attack = attack;
	this.defense = defense;
	this.speed = speed;
	this.health = health;
	this.original_health = health;
	this.pokedex = pokedex; //enum value of each pokemon
	this.player = null;
	this.other = {};
	this.status = null;
	this.disabled = false; //cannot attack this turn if true
	this.move = null;
	this.$wrapper = $wrapper;
	this.txt = null;
    this.stages = null;
    this.done = false;
}

//Move Object
//pre is a boolean representing whether the effect has
//pre-attack or post-attack effect
function Move( pwr, acc, effect, pre, name, priority ) {
	this.pwr = pwr;
	this.acc = acc;
	this.effect = effect;
	this.pre = pre;
	this.player = null;
	this.priority = priority;
	this.name = name;
}

//Status Aliment Object
//if duration == false, that means infinite
function Status( type, duration ) {
	this.type = type;
	this.duration = duration;
	this.started = turn;
    this.bTurn = false;
}

//Stat Stage Object
//holds the individual stages of each stat
//0 = no change to stat
function Stat_Stages(attack, defense, speed, health) {
    this.attack = 0;
    this.defense = 0;
    this.speed = 0;
    this.original_attack = attack;
    this.original_defense = defense;
    this.original_speed = speed;
}

//	2 Player's Global variables
var play1 = new Pokemon();
var play2 = new Pokemon();
/*Global Variable Short List*/
var turn = 1;
var pick_turn = 1;

//Custom Events
var onBothPlayersReady = jQuery.Event("BothPlayersReady");
var onDamageRecorded = jQuery.Event("DamageRecorded");
var onDeath = jQuery.Event("Death");

//Global Data Arrays
var nameList = ['Jolteon', 'Vaporeon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon'];

//Name, Attack, Defense, Speed, Health
var creationList = [
	["Jolteon", 202, 144, 238, 240],
	["Vaporeon", 202, 144, 121, 370],
	["Flareon", 238, 157, 121, 240],
	["Espeon", 238, 144, 202, 240],
	["Umbreon", 121, 220, 121, 300],
	["Leafeon", 202, 180, 175, 240],
	["Glaceon", 238, 189, 121, 240] ];

var moveList = [
	["Yawn", "Discharge", "Charge Beam", "Thunderbolt"],
	["Wish", "Flail", "Water Pulse", "Auora Beam"],
	["Facade", "Fire Fang", "Wil-O-Wisp", "Flame Charge"],
	["Swift", "Calm Mind", "Magic Coat", "Stored Power"],
	["Taunt", "Curse", "Toxic", "Payback"],
	["Leaf Blade", "Leech Seed", "Substitute", "Swords Dance"],
	["Blizzard", "Ice Shard", "Mirror Coat", "Frost Breath"] ];

//To access: var[Pokemon.pokedex][Move Number][Move Stat Info]
//Move Stat Info is organized as follows: var[][][index]
//									var[0] = Move Name/Effect
//									var[1] = Move Power
//									var[2] = Move Accuracy
//									var[3] = Pre Effect Boolean
//                                  var[4] = Move Priority
var moveParams = [
	[ //Jolteon - 0
		["Yawn", null, 100, true, 0], //0
		["Discharge", 80, 100, false, 0], //1
		["Charge Beam", 50, 90, false, 0], //2
		["Thunderbolt", 95, 100, null, 0] ], //3

	[ //Vaporeon - 1
		["Wish", null, null, true, 0], //0
		["Flail", 20, 100, true, 0], //1
		["Water Pulse", 60, 100, false, 0], //2
		["Auora Beam", 65, 100, false, 0] ], //3
	
	[ //Flareon - 2
		["Facade", 70, 100, true, 0],
		["Fire Fang", 60, 95, false, 0],
		["Wil O Wisp", null, 75, true, 0],
		["Flame Charge", 50, 100, false, 0] ],
	
	[ //Espeon - 3
		["Swift", 60, "---", null, 0],
		["Calm Mind", null, null, true, 0],
		["Magic Coat", null, null, true, 4],
		["Stored Power", 20, 100, true, 0] ],
	
	[ //Umbreon - 4
		["Taunt", null, 100, true, 0],
		["Curse", null, null, true, 0],
		["Toxic", null, 90, true, 0],
		["Payback", 50, 100, true, 0] ],
	
	[ //Leafeon - 5
		["Leaf Blade", 90, 100, null, 0],
		["Leech Seed", null, 90, true, 0],
		["Substitute", null, null, true, 0], //check priority
		["Swords Dance", null, null, true, 0] ],
		
	[ //Glaceon - 6
		["Blizzard", 120, 70, null, 0],
		["Ice Shard", 40, 100, null, 10],
		["Mirror Coat", null, null, true, -10], //check priority
		["Frost Breath", 40, 90, true, 0] ] ];

//a array of all move descriptions sorted in the same method
//as the arrays above. This array is 2D -> moveDesc[Pokedex][Move Number]
var moveDesc = [
    //Jolteon - 0
    [
        //Yawn
        "Causes opponent to fall Asleep in one turn",
        //Discharge
        "A damage move that also has a 50% chance of causing Paralysis",
        //Charge Beam
        "A weaker damage move that also has a 70% chance of raising Jolteon's Attack by one stage",
        //Thunderbolt
        "A standard high damage move",
    ],
    //Vaporeon
    [
        //Wish
        "Heals for 1/2 of Vaporeon's maximum Health in one turn",
        //Flail
        "A move that inflicts damage and will inflict greater damage when Vaporeon's Health is low",
        //Water Pulse
        "A damage move that also has a 50% chance of causing Confusion",
        //Auora Beam
        "A damage move that also has a 30% chance of lowering the opponent's Attack by one stage",
    ],
    //Flareon
    [
        //Facade
        "A move that inflicts greater damage if Flareon is affected by any Status Aliment",
        //Fire Fang
        "A damage move that also has a 20% chance to cause the opponent to Flinch",
        //Wil O Wisp
        "Burns Flareon's opponent",
        //Flame Charge
        "A weaker damage move that also increases Flareon's Speed by one stage",
    ],
    //Espeon
    [
        //Swift
        "A damage move that is guaranteed to hit",
        //Calm Mind
        "Raises Espeon's Attack and Defense by one stage each",
        //Magic Coat
        "Creates a shield that reflects any Status Aliments back at the user",
        //Stored Power
        "The Power of this move increases by 20 for every positive Stat Stage Espeon has",
    ],
    //Umbreon
    [
        //Taunt
        "Forces opponent to use a damaging move",
        //Curse
        "Raises Umbreon's Attack and Defense by one stage, but lowers Speed by one stage",
        //Toxic
        "Badly poisons the opponent, increasing the damage every turn",
        //Payback
        "A low Power move that doubles if Umbreon is attacked this turn",
    ],
    //Leafeon
    [
        //Leaf Blade
        "A standard high damage move",
        //Leech Seed
        "A Status Aliment that causes Leafeon to absorb 1/8 of the opponent's current Health",
        //Substitute
        "At the cost of 1/4 of Leafeon's current Health, creates a clone of Leafeon which takes the opponent's attacks until it faints. The clone's health is equal to the amount sacrificed",
        //Swords Dance
        "Raises Leafeon's Attack by two stages",
    ],
    //Glaceon
    [
        //Blizzard
        "A very high damage move, but slightly inaccurate",
        //Ice Shard
        "A weaker damage move that always goes first",
        //Mirror Coat
        "Blocks the opponent's damaging attack, and deals 1.5x the damage it would of dealth",
        //Frost Breath
        "A damage move that ignores the opponent's Defense",
    ]
];

/*********************************************************************************/
//Function Library

// Text Area Function
function refresh( who, inString ) {
    if ( who == null ) {
        var format = $(".p3t");
        $("#textarea_wrapper ul").append( '<li> > ' + inString + '</li>' );
	    $("#textarea_wrapper li:last").addClass(format);
    }
    else {
	    $("#textarea_wrapper ul").append( '<li> > ' + inString + '</li>' );
	    $("#textarea_wrapper li:last").addClass(who.txt);
    }

    $("#textarea_wrapper").animate({scrollTop: $("#textarea_wrapper")[0].scrollHeight}, 'slow');
}

// Health Bar Function
function deathCheck( poke ) {
    if ( poke.health < 1 ) {
        poke.health = 0;
        onDeath.who = poke;
        console.log("onDeath triggered");
        $(document).trigger(onDeath);
        return true;
    }
    return false;
}
function updateHealthBar( poke ) {
    deathCheck(poke);
	var $txt = poke.$wrapper.find(".bar_val").parent();
	$txt.find(".bar_val").remove();
	$txt.append('<span class="bar_val">' +poke.health+' / '+poke.original_health+'</span>');
	var percent = (poke.health / poke.original_health) *100;
	$txt.parent().find(".bar.bar-danger").css({"width" : percent+'%'});
}