/* This file includes all event handlers and a few support functions */

$(document).ready( function() {

	/*Header Button Functions*/

	/*Mouse over header button functions*/
	$(".extra_wrapper, .random_wrapper").hover(
		function() {
			$(this).find("span").toggleClass("over");
			$(this).find(".head_pic").css( {"border": "2px solid red"} );
			$(this).find(".bg_pic").fadeTo( 25, 0.3 );
		},
		function() {
			$(this).find("span").toggleClass("over");
			$(this).find(".head_pic").css( {"border": "none"});
			$(this).find(".bg_pic").fadeTo( 25, 1 );
		});

	/*Mouse click header button functions*/
	function setMenu( who, where ) {
		//assigns the choosen pokemon to the correct global
		var Evana = creationList[who];
		var Gizzi = new Pokemon( Evana[0], Evana[1], Evana[2], Evana[3], Evana[4], who, where);

		// actual menu setup
		where.find(".p_name").append( '<span class="pName">  ' + Evana[0] + '</span>');
		
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
            play1.txt = "p1t";
            refresh( play1, "Player 1 has choosen " + creationList[$Evana][0] );
		}
		else if ( pick_turn == 2 ) {
			$("#p2_pic").css( { "background-image" : 'url( ' + $img + ')' } );
			$(".extra_wrapper, .random_wrapper").each( function() {
				$(this).unbind("click mouseenter mouseleave");
			});
			play2 = setMenu($Evana, $("#p2_info") );
			play2.player = 2;
			play2.txt = "p2t";
			refresh( play2, "Player 2 has choosen " + creationList[$Evana][0] );
			$(".btn.disabled").addClass("activated");
			$(".btn").removeClass("disabled");
			play1.other = play2;
			play2.other = play1;
		}

		$(this).unbind("click mouseenter mouseleave");
		//refresh( "Player " + pick_turn + " has choosen " + creationList[$Evana][0] );
		pick_turn++;
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
			play1.txt = "p1t";
			refresh( play1, "Player 1 has choosen " + creationList[Evana][0] );
		}
		else if ( pick_turn == 2 ) {
		    $(".random_wrapper").unbind("click");
			$("#p2_pic").css( { "background-image" : dotCom } );
			$(".extra_wrapper").each( function() {
				$(".extra_wrapper").unbind("click mouseenter mouseleave");
			});
			play2 = setMenu(Evana, $("#p2_info") );
			play2.player = 2;
			play2.txt = "p2t";
			refresh( play2, "Player 2 has choosen " + creationList[Evana][0] );
			$(".random_wrapper").on("mouseleave", function() {
				$(".random_wrapper").unbind("mouseenter mouseleave");
			});
			$(".btn.disabled").addClass("activated");
			$(".btn").removeClass("disabled");
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
		//refresh( "Player " + pick_turn + " has choosen " + creationList[Evana][0] );
		pick_turn++;
	});

	/*******************************************************************************************************/

	// Move Functions/Button Functions

	//Move button mouse over function

	// Pre is a boolean statement to determine wether or not
	// the effect of the move should be applied before damage
	// takes place, or after
	//Example: Facade is a Pre Effect to increase power if status
	//Example: Charge Beam is a Post Effect, increases attack AFTER the turn
	$(document).on( "click", ".activated", function() {
	    console.log("running btn click handler");
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
			butt.removeClass("activated");
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
		//if neither player has died
		if (play1.health > 0 && play2.health > 0) {
		    setTimeout( function() {
		        $(document).trigger(onDamageRecorded);
		    }, 5500 );
		}
	});

	$(document).on( "DamageRecorded", function() {
	    if (play1.health > 0 && play2.health > 0 ) {
    	    console.log("DamageRecorded triggered successsful");
    	    play1.move = null;
    	    play2.move = null;
    	    turn++; //increment turn counter
    	    setTimeout(function() {
    	        if (play1.status != null) {
                    removeAliment(play1); //defined in status_function.js
    	        }
            }, 1000);
            setTimeout(function() {
                if (play2.status != null) {
                    removeAliment(play2);
                }
                $(".btn.disabled").addClass("activated");
                $(".btn").removeClass("disabled");
            }, 1000);
	    }
	    else {
	        console.log("DamageRecorded triggered successful - doing nothing due to detected death");
	    }
	});
	
	$(document).on( "Death", function() {
	    console.log("onDeath was triggered successfully");
	    $(".btn.activated").addClass("disabled");
		$(".btn").removeClass("activated");
	    refresh(onDeath.who.other, onDeath.who.name+" has fainted! "+onDeath.who.other.name+" wins!");
	});
	
	/*******************************************************************************************************/

    //Footer button functions
    
    //Reset Button
    $("#reset_btn").on("click", function() {
        $(this).unbind("click");
        window.location.reload();
    });
    
    $(".accordion-group a").on("click", function() {
        $(this).unbind("click");
        var Evana = $(this).parent().parent();
        var Gizzi = Evana.attr("id");
        Gizzi = getPokefromName(Gizzi);
        Evana = Evana.find(".accordion-inner");
        for ( var i=0; i<4; i++ ) {
            Evana.append(
                    '<h5>' + moveParams[Gizzi][i][0] + '</h5>' +
                    '<p class="well well-small">' +
                        '<span class="line-one"><strong>Power:</strong> ' + getMoveParam(Gizzi, i, 1) + '</span>' +
                        '<span class="line-one"><strong>Accuracy:</strong> ' + getMoveParam(Gizzi, i, 2) + '</span>' +
                        '<span class="line-two"> ' + moveDesc[Gizzi][i] + '</span>' +
                    '</p>' );
        }
    });
    
    function getMoveParam( Evana, Gizzi, Param ) {
        return ( moveParams[Evana][Gizzi][Param] == null ) ? 'N/A' : moveParams[Evana][Gizzi][Param];
    }
    
    function getPokefromName( Marc ) {
        for ( var i=0; i<7; i++ ) {
            if ( Marc == creationList[i][0] ) {
                return i;
            }
        }
    }

});