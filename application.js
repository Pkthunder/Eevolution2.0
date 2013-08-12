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
		var Gizzi = new Pokemon( Evana[0], Evana[1], Evana[2], Evana[3], Evana[4], who );

		// actual menu setup
		where.find(".p_name").append( '<span class="pName">  ' + Evana[0] + '</span>');
		//TODO: Research how to change the text inside a Bootstrap progress bar
		//where.find(".bar_value").text('100%', Gizzi.health +" of "+ Gizzi.health);
		
		// set button names
		where.find(".b1 > button").text(moveList[who][0]);
		where.find(".b2 > button").text(moveList[who][1]);
		where.find(".b3 > button").text(moveList[who][2]);
		where.find(".b4 > button").text(moveList[who][3]);

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
			$(".btn").removeClass("disabled");
			//$("#heading_wrapper").hide();
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
			play2 = setMenu(Evana, $("#p2_info") );
			play1.player = 2;
			$(".random_wrapper").on("mouseleave", function(){
				$(this).unbind("click mouseenter mouseleave")
			});
			$(".btn").removeClass("disabled");
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
	$("button").on( "click", function() {
		// var Evana = getPoke($(this));
		// var Gizzi = getMove($(this));
		// Gizzi = Gizzi - 1;
		// var tooCute = new Move(	moveParams[Evana][Gizzi][1], moveParams[Evana][Gizzi][2],
		// 						moveParams[Evana][Gizzi][0], moveParams[Evana][Gizzi][3] );
		// alert(moveParams[Evana][Gizzi][0]);
		// loadMove(tooCute, $(this));
		moveEffects["Yawn"];

	});

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
			alert(Evana);
			moveEffects[eval(Evana)](moveItGurl);
			console.log("Running pre-move effect");
		}
		var Gizzi = datPointer.parent().attr("id");
		Gizzi = Gizzi.replace('p','').replace('_button_wrapper','');
		alert("loadMove: var Gizzi: " +Gizzi);
	}

	/*******************************************************************************************************/

	//Status Element Object functions

	// function addStatus( type, who ) {
	// 	var Gizzi = "play" + who;
	// 	var datAss = eval(Gizzi);
	// 	addStatusEffects[type](datAss);
	// }

	// function removeStatus( who ) {
	// 	var Evana = "play" + who;
	// 	var Gizzi = eval(Evana);
	// 	var type = Gizzi.status;
	// 	removeStatusEffects[type]();
	// }

});