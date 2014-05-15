/* This file contains the Finite State Machine for the battle phase */

function BattlePhase() {
	this.first;
	this.last;
	this.firstDone = false;
	this.death = false;

	this.fsm = StateMachine.create({
		events: [
			{ name: 'start', from: 'none', to: 'ready' },
			{ name: 'toSpeed', from: 'ready', to: 'speed' }, //checks for first, and begins first's turn
			{ name: 'bTurn', from: 'done', to: 'between' }, //begins last's turn
			{ name: 'toAliment', from: ['speed', 'between'], to: 'aliment' },
			{ name: 'toDisable', from: ['speed', 'aliment', 'between'], to: 'disable' },
			//disable state will now include HitCheck() call, and will end turn if failed
			{ name: 'toPre', from: 'disable', to: 'pre' },
			{ name: 'toDamage', from: ['disable', 'pre'], to: 'damage' },
			{ name: 'toPost', from: 'damage', to: 'post' },
			{ name: 'toTurnDone', from: ['aliment', 'disable', 'pre', 'damage', 'post'], to: 'done' },
			{ name: 'toPhaseOver', from: 'done', to: 'over' }
		],
		callbacks: {
			onbeforeevent: function(event, from, to) {
				if ( play1.health < 1 || play2.health < 1 ) {
					console.log('Death Detected');
					if ( !(to === 'death') ) {
						console.log('Canceling '+event);
						setDeath();
						return false;
					}
				}
			},
			onenterstate: function(event, from, to) {
				console.log('***current: '+this.current);
				console.log( to + ' reached... came from: ' + from);
			},
			onleavestate: function(event, from, to) {
				return StateMachine.ASYNC;
			},
			onready: function(event, from, to) {
				//prints the Turn # (in black i.e. the null)
			    refresh(null, "--- Turn: "+turn+" --- <");
				this.toSpeed();
				shiftDelay();
			},
			onspeed: function(event, from, to) {
				var atk;
			    if (play1.move.priority != 0 || play2.move.priority != 0 ) {
			       	atk = priorityCheck();
			    }
			    else {
			        atk = speedCheck();
			    }
			    setFirst(atk);
			    (atk.status != null) ? this.toAliment(atk) : this.toDisable(atk);
			    shortDelay();
			},
			onbetween: function(event, from, to, attacker) {
				(attacker.status != null) ? this.toAliment(attacker) : this.toDisable(attacker);
				shiftDelay();
			},
			onaliment: function(event, from, to, attacker) {
				runAliment(attacker);
				this.toDisable(attacker);
				longDelay();
			},
			ondisable: function(event, from, to, attacker) {
				if ( attacker.disabled ) {
					refresh(attacker, ((attacker.disabled_msg != undefined) ? 
						attacker.disabled_msg : attacker.name+" is unable to attack!") );

					this.toTurnDone(attacker);
					longDelay();
				}
				else {
					refresh(attacker, attacker.name + " uses " + attacker.move.name);
					if (hitCheck(attacker)) {
						this.toPre(attacker);
						longDelay();
					} 
					else {
						refresh(attacker, attacker.name+' missed!');
						this.toTurnDone(attacker);
						shortDelay();
					}
				}
			},
			onpre: function(event, from, to, attacker) {
				if ( attacker.move.pre ) {
					runEffect(attacker);
					(attacker.move.pwr != null) ? this.toDamage(attacker) : this.toTurnDone(attacker);
					longDelay();
				}
				else {
					this.toDamage(attacker);
					shortDelay();
				}
			},
			ondamage: function(event, from, to, attacker) {
				var dmg = calcDmg(attacker);
		        recordDmg(attacker.other, dmg);

		        (attacker.move.pre == false) ? this.toPost(attacker) : this.toTurnDone(attacker);
		        longDelay();
			},
			onpost: function(event, from, to, attacker) {
				runEffect(attacker);
				this.toTurnDone(attacker);
				longDelay();
			},
			ondone: function(event, from, to, attacker) {
				if (!isFirstDone()) {
					setFirstDone();
					this.bTurn(attacker.other);
				}
				else { //handles 'between turn status aliments'
					if (attacker.status != null && attacker.status.bTurn) 
						removeStatusEffects[attacker.status.type](attacker);
					if (attacker.other.status != null && attacker.other.status.bTurn) 
						removeStatusEffects[attacker.status.type](attacker.other);
					this.toPhaseOver();
				}
				shortDelay();
			},
			onover: function(event, from, to, attacker) {
				$(document).trigger(onDamageRecorded);
			}
		}

	});

	var this_ = this;
	var transition = function() {
		if ( !(this_.death) ) { this_.fsm.transition(); }
	}
	var shortDelay = function() { //Allows each state to complete fully before advancing and for compulation time
		setTimeout( function() {
			transition();
		}, 100);
	}
	var longDelay = function() { //Allows time for animations and gives user time to track events
		setTimeout( function() {
			transition();
		}, 750);
	}
	var shiftDelay = function() { //Allows for user to track events after shifts in control
		setTimeout( function() {
			transition();
		}, 1250);
	}

	var setFirst = function(p) {
		this_.first = p;
		this_.last = p.other;
	}
	var getFirst = function() {
		return this_.first;
	}
	var setFirstDone = function() {
		this_.firstDone = true;
	}
	var isFirstDone = function() {
		return this_.firstDone;
	}
	var setDeath = function() {
		this_.death = true;
	}

	this.fsm.start();
	transition(); // from: 'none' -> to: 'ready'
}