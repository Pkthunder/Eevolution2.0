//All effects of moves
var moveEffects = {
//Jolteon
	Yawn: function(Beasley) {
		return Beasley.move.effect;
	},
	Discharge: function(Beasley) {
		return Beasley.move.effect;
	},
	ChargeBeam: function(Beasley) {
		return Beasley.move.effect;
	},
/////////////////////////////////////////////////
//Vaporeon
	Wish: function(Beasley) {
		return Beasley.move.effect;
	},
	Flail: function(Beasley) {
		return Beasley.move.effect;
	},
	WaterPulse: function(Beasley) {
		return Beasley.move.effect;
	},
	AuoraBeam: function(Beasley) {
		return Beasley.move.effect;
	},
////////////////////////////////////////////////
//Flareon
	Facade: function(Beasley) {
		if ( Beasley.status != null )
			Beasley.move.pwr = Beasley.move.pwr * 2;
		return Beasley.move.effect;
	},
	FireFang: function(Beasley) {
		return Beasley.move.effect;
	},
	Wisp: function(Beasley) {
		return Beasley.move.effect;
	},
	FlameCharge: function(Beasley) {
		return Beasley.move.effect;
	},
///////////////////////////////////////////////
//Espeon
	Swift: function(Beasley) {
		return Beasley.move.effect;
	},
	CalmMind: function(Beasley) {
		return Beasley.move.effect;
	},
	MagicCoat: function(Beasley) {
		return Beasley.move.effect;
	},
	StoredPower: function(Beasley) {
		return Beasley.move.effect;
	},
///////////////////////////////////////////////
//Umbreon
	Taunt: function(Beasley) {
		return Beasley.move.effect;
	},
	Curse: function(Beasley) {
		return Beasley.move.effect;
	},
	Toxic: function(Beasley) {
		return Beasley.move.effect;
	},
	Payback: function(Beasley) {
		return Beasley.move.effect;
	},
//////////////////////////////////////////////
//Leafeon
	LeechSeed: function(Beasley) {
		return Beasley.move.effect;
	},
	Substitute: function(Beasley) {
		return Beasley.move.effect;
	},
	SwordsDance: function(Beasley) {
		return Beasley.move.effect;
	},
//////////////////////////////////////////////
//Glaceon
	IceShard: function(Beasley) {
		return Beasley.move.effect;
	},
	MirrorCoat: function(Beasley) {
		return Beasley.move.effect;
	},
	FrostBreath: function(Beasley) {
		return Beasley.move.effect;
	}
};

