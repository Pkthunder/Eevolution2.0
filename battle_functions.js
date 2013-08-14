(function() {

	var fight = function( p1, p2 ) {
		this.p1 = p1;
		this.p2 = p2;
		this.first = null;
	};

	fight.prototype.speedCheck = function() {
		if ( this.p1.speed == this.p2.speed ) {
			var coin = Math.floor(Math.random()*2);
			return ( coin == 0 ) ? this.p1 : this.p2;
		}
		return ( this.p1.speed > this.p2.speed ) ? this.p1 : this.p2;
	};

	fight.prototype.priorityCheck = function() {
		if ( this.p1.move.priority == this.p2.move.priority ) {
			var fastest = this.speedCheck();
			return fastest;
		}
		return (this.p1.move.priority > this.p2.move.priority) ? this.p1 : this.p2;
	}

	fight.prototype.getRandom = function() {
		var Evana = Math.floor(Math.random()*15) + 1;
		Evana = Evana + 85;
		console.log("RandomNumber: " +Evana);
		return Evana;
	};

	fight.prototype.calcDmg = function(attacker) {
		//Damage Formula according to Serebii.net
		//Damage = ((((2 * Level / 5 + 2) * AttackStat * AttackPower / DefenseStat) / 50) + 2)
					//* STAB * Weakness/Resistance * RandomNumber / 100

		var rand = getRandom();
		var Dmg = (((((42 * attacker.attack * attacker.move.pwr) / attacker.other.defense) / 50) + 2) * rand) / 100;
		return Dmg;
	};

	fight.prototype.recordDmg = function(target, damage) {
		target.health = target.health - damage;
	};

	fight.prototype.runBattlePhase = function() {
		
	};
});