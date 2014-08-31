/* This file includes non-battle event handlers and a few support functions */

$(document).ready( function() {

	/*Init Function, once all images and etc are fully loaded*/
	//to draw attention to the fact the players need to select pokemon
	//Flashes 'Choose a Pokemon'
	//Move to Init() Function?
	$(".player_info > :not(:has(span.choose)), .player_pic").css('opacity', 0.3);
	$(window).load( function() { //doesn't start animation until images are loaded
		setTimeout( function() {
			setInterval( function() {
				$(".choose").toggle();
			}, 750);
			animateHeader();
		}, 500);
	});

/*************************************************************************************************/
/* Header Animation Functions */

	var headerId;
	function animateHeader() {
			var $temp = $(".extra_wrapper:not(.picked):first");
			toggleHeaderAni($temp);
			headerId = setInterval( function() {
				toggleHeaderAni($temp);
				$temp = $temp.nextOrFirst(); //nexOrFirst documented in core.js
				if ($temp.hasClass("picked"))
					$temp = $temp.nextOrFirst();
				toggleHeaderAni($temp);
			}, 1200);
	}

	function resetHeaderAni() {
		if ( pick_turn < 3 ) {
			headerId = setTimeout( function() {
				animateHeader();
			}, 2500);
		}
	}

	function cancelHeaderAni() {
		clearInterval(headerId);
		$(".extra_wrapper:not(.picked), .random_wrapper").each( function() {
			$(this).find("span").removeClass("over");
			$(this).find(".head_pic").css( {"border": "none"});
			$(this).find(".bg_pic").css( {"opacity" : 1.0});
		});
	}

	function toggleHeaderAni(obj) {
		if (!obj.find("span").hasClass("over")) {
			//mouseenter
			obj.find("span").addClass("over");
			obj.find(".head_pic").css( {"border": "2px solid red"} );
			obj.find(".bg_pic").css( {"opacity" : 0.3});
		}
		else {
			//mouseleave
			obj.find("span").removeClass("over");
			obj.find(".head_pic").css( {"border": "none"});
			obj.find(".bg_pic").css( {"opacity" : 1.0});
		}
	}

	/*Header Button Functions*/
	$("#heading_wrapper").hover(
		function() {
			cancelHeaderAni();
			//console.log(".bg_pic mouseenter");
		},
		function() {
			resetHeaderAni();
			//console.log(".bg_pic mouseleave");
		}
	);

	/*Mouse over header button functions*/
	$(".extra_wrapper, .random_wrapper").hover(
		function() { //mouseenter
			$(this).find("span").addClass("over");
			$(this).find(".head_pic").css( {"border": "2px solid red"} );
			$(this).find(".bg_pic").css( {"opacity" : 0.3});
		},
		function() { //mouseleave
			$(this).find("span").removeClass("over");
			$(this).find(".head_pic").css( {"border": "none"});
			$(this).find(".bg_pic").css( {"opacity" : 1.0});
		}
	);

	/*Mouse click header button functions*/
	function setMenu( who, where ) {
		//assigns the choosen pokemon to the correct global
		var Evana = creationList[who];
		var Gizzi = new Pokemon( Evana[0], Evana[1], Evana[2], Evana[3], Evana[4], who, where);
		var Marc = new Stat_Stages( Evana[1], Evana[2], Evana[3], Evana[4] );
		Gizzi.stages = Marc;

		// actual menu setup
		where.find(".choose").remove();
		where.find(".p_name").append( '<span class="pName">  ' + Evana[0] + '</span>');
		
		// set button names
		where.find(".b1 > button").text(moveList[who][0]);
		where.find(".b2 > button").text(moveList[who][1]);
		where.find(".b3 > button").text(moveList[who][2]);
		where.find(".b4 > button").text(moveList[who][3]);

		//set health
		Gizzi.updateHealthBar();
		

		return Gizzi;
	}

	function PickOne($img, $Evana) {
		$("#intro").remove();
		$("#p1_pic").css( { "background-image" : $img } );
		play1 = setMenu($Evana, $("#p1_info") );
		play1.player = 1;
        play1.txt = "p1t";
        refresh( play1, "Player 1 has choosen " + creationList[$Evana][0] );
        cancelHeaderAni();
	}

	function PickTwo($img, $Evana) {
		$("#p2_pic").css( { "background-image" : $img } );
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
		$("#tooltips-switch").bootstrapSwitch('state', true);
		initTooltip();
		$(".player_info > , .player_pic").css('opacity', 1.0);
		$(".extra_wrapper").each( function() {
			if (!$(this).hasClass("picked")) {
				$(this).find(".bg_pic").hide();
			}
		});
		$(".random_wrapper").find(".bg_pic").hide();
		$("#heading_wrapper").unbind("mouseenter mouseleave");
	}

	//Pokemon Button Function
	$(".extra_wrapper").on( "click", function() {
		var $img = $(this).find(".bg_pic").css('background-image');

		var $Evana = $(this).find(".bg_pic").attr("id");
		$Evana = $Evana.replace('"', '').replace('_pic', '').replace('"', '');
		$Evana--;

		$(this).unbind("click mouseenter mouseleave");
		$(this).addClass("picked");

		if ( pick_turn == 1) {
   			PickOne($img, $Evana);
		}

		else if ( pick_turn == 2 ) {
			PickTwo($img, $Evana);
		}

		pick_turn++;
	});
	
	//Random Button Function
	$(".random_wrapper").on( "click", function() {
		var Evana;
		var Gizzi;

		//prevents duplicates
		do {
			 Evana = Math.floor(Math.random()*7) + 1;
			 Gizzi = '#' + Evana + '_pic';
			 Evana--;
		} while ( Evana == play1.pokedex );

		//retrieves correct picture from the background-pics
		//and places it in the correct player location
		var shesBomb = $(".extra_wrapper").find( ''+Gizzi+'' );
		var dotCom = shesBomb.css("background-image");

		//correctly highlights/fades/displays text on the
		//randomly choosen pokemon
		var MarcG = shesBomb.parent();
		MarcG.find("span").addClass("over");
		MarcG.find(".head_pic").css( {"border": "2px solid red"} );
		MarcG.find(".bg_pic").css( {"opacity" : 0.3});
		MarcG.unbind("click mouseenter mouseleave");
		MarcG.addClass("picked");

		if ( pick_turn == 1 ) {
			PickOne(dotCom, Evana);
		}

		else if ( pick_turn == 2 ) {
			$(this).trigger('mouseleave');
			PickTwo(dotCom, Evana);
		}

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
	    //console.log("running btn click handler");
	    $("[data-toggle='tooltip']").tooltip('hide');
		var Evana = getPoke($(this).parent());
		var Gizzi = getMove($(this).parent());
		Gizzi = Gizzi - 1;
		var tooCute = new Move(	moveParams[Evana][Gizzi][1], moveParams[Evana][Gizzi][2],
								moveParams[Evana][Gizzi][0], moveParams[Evana][Gizzi][3],
								moveParams[Evana][Gizzi][0], moveParams[Evana][Gizzi][4] );
		loadMove(tooCute, $(this).parent());
	});

	function getPoke( Gizzi ) {
		var Evana = Gizzi.parent().attr("id");
		Evana = Evana.replace('p','').replace('_button_wrapper','');
		var Gizzi = "play" + Evana;
		//var akaBeez = eval(Gizzi);
		var akaBeez = window[Gizzi];
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
		//var user = eval(who);
		var user = window[who];
		user.move = moveItGurl;
		//disable buttons
		disabledButtons(datPointer);
		if ( play1.move != null && play2.move != null ) {
			$(document).trigger(onBothPlayersReady);
		}
	}

/*******************************************************************************************************/

//Custom Event Handlers - BothPlayersReady, DamageRecorded, Death

	$(document).on( "BothPlayersReady", function() {
		//console.log("BothPlayersReady triggered successful");
		//starts 'Battle Phase'
		//all functions are defined inside battle_functions.js
		//runBattlePhase();
		var test = new BattlePhase();
	});

	$(document).on( "DamageRecorded", function() {
	    if (play1.health > 0 && play2.health > 0 ) {
    	    //console.log("DamageRecorded triggered successsful");
    	    play1.move = null;
    	    play2.move = null;
    	    play1.done = false;
    	    play2.done = false;
    	    turn++; //increment turn counter
            $(".btn.disabled").addClass("activated");
            $(".btn").removeClass("disabled");
	    }
	    else {
	        console.log("DamageRecorded triggered successful - doing nothing due to detected death");
	    }
	});
	
	$(document).on( "Death", function() {
	    //console.log("onDeath was triggered successfully");
	    $(".btn.activated").addClass("disabled");
		$(".btn").removeClass("activated");
		removeTooltip();
	    refresh(onDeath.who.other, onDeath.who.name+" has fainted! "+onDeath.who.other.name+" wins!");
	});
	
	/*******************************************************************************************************/

    //Footer button functions
    
    //Reset Button
    $("#reset_btn").on("click", function() {
        $(this).unbind("click");
        window.location.reload();
    });

  //   function resetGame() {
		// //Reset Player Panel
		// $(".player_pic").css( "background-image", "url( 'img/133Eevee.png' )");
		// //temporary simply to reset health bar
		// play1.health = play1.original_health = play2.health = play2.original_health = 0;
		// play1.updateHealthBar();
		// play2.updateHealthBar();
		// //Reset Name

		// //Resets all Global Variables
  //   	play1 = new Pokemon();
		// play2 = new Pokemon();
		// turn = 1;
		// pick_turn = 1;
  //   }
    
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
            if ( Marc == nameList[i] ) {
                return i;
            }
        }
    }

    $("#tooltips-switch").bootstrapSwitch();

    function getTooltipState() {
    	return ($('#tooltips-switch').bootstrapSwitch('state')); 
    }

   /*function initTooltip() {
    	var Evana = $("#p1_b1").parent().parent();
    	var Gizzi = Evana.find('.pName').text();
    	var p1 = getPokefromName(Gizzi.trim());
    	Evana = $("#p2_b1").parent().parent();
    	Gizzi = Evana.find('.pName').text();
    	var p2 = getPokefromName(Gizzi.trim());

    	//Player 1
    	var temp = $("#p1_b1 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('title', moveDesc[p1][0]);
    	temp.tooltip();

    	temp = $("#p1_b2 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('title', moveDesc[p1][1]);
    	temp.tooltip();

    	temp = $("#p1_b3 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'bottom').attr('title', moveDesc[p1][2]);
    	temp.tooltip();

    	temp = $("#p1_b4 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'bottom').attr('title', moveDesc[p1][3]);
    	temp.tooltip();

    	//Player 2
    	temp = $("#p2_b1 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('title', moveDesc[p2][0]);
    	temp.tooltip();

    	temp = $("#p2_b2 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('title', moveDesc[p2][1]);
    	temp.tooltip();

    	temp = $("#p2_b3 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'bottom').attr('title', moveDesc[p2][2]);
    	temp.tooltip();

    	temp = $("#p2_b4 button");
    	temp.attr('data-toggle', 'tooltip').attr('data-placement', 'bottom').attr('title', moveDesc[p2][3]);
    	temp.tooltip();
    }*/

    function initTooltip() {
    	var Evana = $("#p1_b1").parent().parent();
    	var Gizzi = Evana.find('.pName').text();
    	var p1 = getPokefromName(Gizzi.trim());
    	Evana = $("#p2_b1").parent().parent();
    	Gizzi = Evana.find('.pName').text();
    	var p2 = getPokefromName(Gizzi.trim());
    	var totalCount = 0;
    	var repCount = 0;

    	$(".button_wrapper div.button button").each( function() {
    		var placement = ( $(this).hasClass("b1") || $(this).hasClass("b2") ) ? 'top' : 'bottom';
    		var pokeId = ( totalCount < 4 ) ? p1 : p2;

    		$(this).tooltip({
	            'placement' : placement,
	            'title' : moveDesc[pokeId][repCount]
	        });
	        totalCount++;
	        repCount++;
	        if (repCount > 3) repCount = 0;
    	});
    }

    function removeTooltip() {
    	$("[data-toggle='tooltip']").tooltip('destroy');
    }
 
 	$('#tooltips-switch').on('switchChange', function (e, data) {
 		if (data.value) {
 			initTooltip();
 			refresh(null, '*** Tooltips are turned on *** <');
 		}
 		if (!(data.value)) {
 			removeTooltip();
 			refresh(null, '*** Tooltips are turned off *** <');
 		}
	});
});