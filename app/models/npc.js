var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseApiQuery = require('mongoose-api-query');

var NPCSchema   = new Schema({
		
		title:String,
		exp: Number,
		size: String,
		footprint: {
			x: Number,
			y: Number,
			z: Number
		},
		reach: Number,
		type: [String],
		mobility: {
			primaryMotionType: String,
			groundSpeed: Number,
			burrowSpeed: Number,
			flySpeed: Number,
			swimSpeed: Number
		},
		templates: {
			rogue: [String],
			monster: [String]
		},
		attributes: {
			strength: Number,
			dexterity: Number,
			constitution: Number,
			intelligence: Number,
			wisdom: Number,
			charisma: Number
		},
		traits: {
			initative: Number,
			attack: Number,
			defense: Number,
			resilience: Number,
			health: Number,
			competence: Number
		},
		signatureSkills: [
		{
			name: String,
			level: Number
		}
		],
		spellcasting: {
			skilGrade: Number,
			spells: [String]
		},
		qualities: [
		{
			name: String,
			notes: String
		}
		],
		treasure: {
			any: Number,
			coin: Number,
			gear: Number,
			loot: Number,
			magic: Number,
			trophies: Number
		},
		gear: {
			mountsAndVehicles: String,
			gear: String
		},
		attacks: [
		{
			attackType: String,
			name: String,
			details: String
		}
		]
		
});
NPCSchema.plugin(mongooseApiQuery);
module.exports = mongoose.model('NPC', NPCSchema);
