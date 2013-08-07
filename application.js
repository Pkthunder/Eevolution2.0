$(document).ready( function() {

	/*Pokemon Object/Array*/
	function Pokemon( name, attack, defense, speed, health, pokedex ) {
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
	}

	//Move Object
	function Move( pwr, acc, effect, pre ) {
		this.pwr = pwr;
		this.acc = acc;
		this.effect = effect;
		this.pre = pre;
	}

	//Status Aliment Object
	//if duration == false, that means infinite
	function Status( type, duration ) {
		this.type = type;
		this.duration = duration;
	}

	//	2 Player's Global variables
	var play1 = new Pokemon;
	var play2 = new Pokemon;
	var move1 = new Move;
	var move2 = new Move;
	/*Global Variable Short List*/
	var turn = 1;
	var pick_turn = 1;
	var nameList = ['Jolteon', 'Vaporeon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon'];

	var creationList = [
		["Jolteon", 100, 100, 100, 100],
		["Vaporeon", 100, 100, 100, 100],
		["Flareon", 100, 100, 100, 100],
		["Espeon", 100, 100, 100, 100],
		["Umbreon", 100, 100, 100, 100],
		["Leafeon", 100, 100, 100, 100],
		["Glaceon", 100, 100, 100, 100] ];

	var moveList = [ //test values
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

	/*******************************************************************************************************/

	/*Header Button Functions*/

	/*Mouse over header button functions*/
	$(".extra_wrapper, .random_wrapper").hover(
		function() {
			$(this).find("span").toggleClass("over");
			$(this).find(".head_pic").css( {"border": "2px solid red"} );
			$(this).find(".bg_pic").fadeTo( "fast", 0.3 );
		},
		function() {
			$(this).find("span").toggleClass("over");
			$(this).find(".head_pic").css( {"border": "none"});
			$(this).find(".bg_pic").fadeTo( "fast", 1 );
		});

	/*Mouse click header button functions*/
	function setMenu( who, where ) {
		//assigns the choosen pokemon to the correct global
		var Evana = creationList[who];
		var Gizzi = new Pokemon( Evana[0], Evana[1], Evana[2], Evana[3], Evana[4], who );

		// actual menu setup
		where.find(".p_name").append( '<span class="pName">  ' + Evana[0] + '</span>');
		where.find(".p_health").append( '<span class="pHealth">  ' + Evana[4] + '</span>');
		
		// set button names
		where.find(".b1").text(moveList[who][0]);
		where.find(".b2").text(moveList[who][1]);
		where.find(".b3").text(moveList[who][2]);
		where.find(".b4").text(moveList[who][3]);

		return Gizzi;
	}

	//Pokemon Button Function
	$(".extra_wrapper").on( "click", function() {
		var $img = $(this).find(".bg_pic").css('background-image');
		$img = $img.replace('url(', '').replace(')', '');

		var $Evana = $(this).find(".bg_pic").attr("id");
		$Evana = $Evana.replace('"', '').replace('_pic', '').replace('"', '');
		$Evana--;

		if ( pick_turn == 1) {
			$("#intro").remove();
			$("#p1_pic").css( { "background-image" : 'url( ' + $img + ')' } );
			play1 = setMenu($Evana, $("#p1_info") );
			play1.player = 1;

		}
		else if ( pick_turn == 2 ) {
			$("#p2_pic").css( { "background-image" : 'url( ' + $img + ')' } );
			$(".extra_wrapper, .random_wrapper").each( function() {
				$(this).unbind("click mouseenter mouseleave");
			});
			play2 = setMenu($Evana, $("#p2_info") );
			play1.player = 2;
			$(".button").bind("click", function() {
				button_click( $(this) );
			});
		}

		$(this).unbind("click mouseenter mouseleave");
		refresh( "Player " + pick_turn + " has choosen " + creationList[$Evana][0] );
		pick_turn++;
		turn++;
	});

	//Random Button Function
	$(".random_wrapper").on( "click", function() {
		var Evana;
		var Gizzi;

		//prevents duplicates
		do {
			 Evana = Math.floor(Math.random()*7);
			 Evana++;
			 Gizzi = '"#' + Evana + '_pic"';
			 Evana--;
		} while ( Evana == play1.pokedex );

		//retrieves correct picture from the background-pics
		//and places it in the correct player location
		var shesBomb = $(".extra_wrapper").find( eval(Gizzi) );
		var dotCom = shesBomb.css("background-image");
		if ( pick_turn == 1 ) {
			$("#intro").remove();
			$("#p1_pic").css( { "background-image" : dotCom } );
			play1 = setMenu(Evana, $("#p1_info") );
			play1.player = 1;
		}
		else if ( pick_turn == 2 ) {
			$("#p2_pic").css( { "background-image" : dotCom } );
			$(".extra_wrapper").each( function() {
				$(this).unbind("click mouseenter mouseleave");
			});
			play2 = setMenu(Evana, $("#p2_info") );
			play1.player = 2;
			$(".random_wrapper").on("mouseleave", function(){
				$(this).unbind("click mouseenter mouseleave")
			});
			$(".button").bind("click", function() {
				button_click( $(this) );
			});
		}

		//correctly highlights/fades/displays text on the
		//randomly choosen pokemon
		var MarcG = shesBomb.parent();
		MarcG.find("span").toggleClass("over");
		MarcG.find(".head_pic").css( {"border": "2px solid red"} );
		MarcG.find(".bg_pic").fadeTo( "fast", 0.3 );
		MarcG.unbind("click mouseenter mouseleave");
		refresh( "Player " + pick_turn + " has choosen " + creationList[Evana][0] );
		pick_turn++;
		turn++;
	});

	/*******************************************************************************************************/

	// Text Area Function
	function refresh( inString ) {
		$("#textarea_wrapper ul").append( '<li> > ' + inString + '</li>' );
		if ( turn %2 == 0 || turn == 0 ) // if (even turn number, including zero)
			$("#textarea_wrapper li:last").addClass("p2t");
		else // if (odd turn number)
			$("#textarea_wrapper li:last").addClass("p1t");
	}


	/*******************************************************************************************************/

	// Move Functions/Button Functions

	//Move button mouse over function

	//TODO:

	//On Click functions

	// Pre is a boolean statement to determine wether or not
	// the effect of the move should be applied before damage
	// takes place, or after
	//Example: Facade is a Pre Effect to increase power if status
	//Example: Charge Beam is a Post Effect, increases attack AFTER the turn
	function button_click( CoolWhip ) {
		var Evana = getPoke(CoolWhip);
		var Gizzi = getMove(CoolWhip);
		Gizzi = Gizzi - 1;
		var tooCute = new Move(	moveParams[Evana][Gizzi][1], moveParams[Evana][Gizzi][2],
								moveParams[Evana][Gizzi][0], moveParams[Evana][Gizzi][3] );
		alert(moveParams[Evana][Gizzi][0]);
		loadMove(tooCute, CoolWhip);

	}

	function getPoke( Gizzi ) {
		var Evana = Gizzi.parent().attr("id");
		Evana = Evana.replace('p','').replace('_button_wrapper','');
		var theCutest = "play" + Evana;
		theCutest = eval(theCutest);
		return theCutest.pokedex;
	}

	function getMove( Gizzi ) {
		Evana = Gizzi.attr("class");
		Evana = Evana.replace('button b','');
		return Evana;
	}

	function loadMove( moveItGurl, datPointer ) {
		if ( moveItGurl.pre ) {
			var Evana = moveItGurl.effect;
			Evana = Evana.replace(' ', '');
			moveEffects[Evana](moveItGurl);
			console.log("Running pre-move effect");
		}
		var Gizzi = datPointer.parent().attr("id");
		Gizzi = Gizzi.replace('p','').replace('_button_wrapper','');
	}

	/*******************************************************************************************************/

	//Status Element Object functions

	function addStatus( type, who ) {
		var Gizzi = "play" + who;
		var datAss = eval(Gizzi);
		addStatusEffects[type](datAss);
	}

	function removeStatus( who ) {
		var Evana = "play" + who;
		var Gizzi = eval(Evana);
		var type = Gizzi.status;
		removeStatusEffects[type]();
	}

});