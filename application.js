/* This file includes all event handlers and a few support functions */

$(document).ready( function() {

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
		var Gizzi = new Pokemon( Evana[0], Evana[1], Evana[2], Evana[3], Evana[4], who, where);

		// actual menu setup
		where.find(".p_name").append( '<span class="pName">  ' + Evana[0] + '</span>');
		//TODO: Research how to change the text inside a Bootstrap progress bar
		//where.find(".bar_value").text('100%', Gizzi.health +" of "+ Gizzi.health);
		
		// set button names
		where.find(".b1 > button").text(moveList[who][0]);
		where.find(".b2 > button").text(moveList[who][1]);
		where.find(".b3 > button").text(moveList[who][2]);
		where.find(".b4 > button").text(moveList[who][3]);

		//set health
		updateHealthBar(Gizzi);

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
			play2.player = 2;
			$(".btn").removeClass("disabled");
			play1.other = play2;
			play2.other = play1;
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
			 Evana = Math.floor(Math.random()*7) + 1;
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
			$(".random_wrapper").unbind("click");
			play2 = setMenu(Evana, $("#p2_info") );
			play2.player = 2;
			$(".random_wrapper").on("mouseleave", function() {
				$(this).unbind("mouseenter mouseleave")
			});
			$(".btn").removeClass("disabled")
				.bind("click");
			play1.other = play2;
			play2.other = play1;
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

	// Move Functions/Button Functions

	//Move button mouse over function

	//TODO:

	//On Click functions

	// Pre is a boolean statement to determine wether or not
	// the effect of the move should be applied before damage
	// takes place, or after
	//Example: Facade is a Pre Effect to increase power if status
	//Example: Charge Beam is a Post Effect, increases attack AFTER the turn
	$(".btn").on( "click", function() {
		var Evana = getPoke($(this).parent());
		var Gizzi = getMove($(this).parent());
		Gizzi = Gizzi - 1;
		var tooCute = new Move(	moveParams[Evana][Gizzi][1], moveParams[Evana][Gizzi][2],
								moveParams[Evana][Gizzi][0], moveParams[Evana][Gizzi][3],
								moveParams[Evana][Gizzi][0] );
		loadMove(tooCute, $(this).parent());
	});

	function getPoke( Gizzi ) {
		var Evana = Gizzi.parent().attr("id");
		Evana = Evana.replace('p','').replace('_button_wrapper','');
		var Gizzi = "play" + Evana;
		var akaBeez = eval(Gizzi);
		return akaBeez.pokedex;
	}

	function getMove( Gizzi ) {
		Evana = Gizzi.attr("class");
		Evana = Evana.replace('button b','');
		return Evana;
	}

	function disabledButtons( who ) {
		var wrapper = who.parent();
		var butt = wrapper.find(".btn");
		for ( var i=0; i<3; i++ ) {
			butt.addClass("disabled");
			butt.unbind("click");
			butt = butt.next();
		}
	}

	function loadMove( moveItGurl, datPointer ) {
		var which = datPointer.parent().attr("id");
		which = which.replace('p', '').replace('_button_wrapper', '');
		var who = "play" + which;
		var user = eval(who);
		user.move = moveItGurl;
		//disable buttons
		disabledButtons(datPointer);
		if ( play1.move != null && play2.move != null ) {
			$(document).trigger(onBothPlayersReady);
			console.log("onBothPlayersReady triggered");
		}
	}

/*******************************************************************************************************/

//Custom Event Handlers - BothPlayersReady, DamageRecorded, Death

	$(document).on( "BothPlayersReady", function() {
		console.log("BothPlayersReady triggered successful");
		//starts 'Battle Phase'
		//all functions are defined inside battle_functions.js
		runBattlePhase();
		//starts next round of 'Battle Phase'
		$(document).trigger(onDamageRecorded);
	});

	$(document).on( "DamageRecorded", function() {
		$(".btn").removeClass("disabled").bind("click");
	});
	
	$(document).on( "Death", function(who) {
	    refresh(who.name+" has fainted! "+who.other.name+" wins!");
	    alert("Cunnilingus");
	});

	/*******************************************************************************************************/


});