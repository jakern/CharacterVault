// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://192.168.1.21:27072'); // connect to our database
var NPC     = require('./app/models/npc');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to CharacterVault. ' });
});

// on routes that end in /npcs
// ----------------------------------------------------
router.route('/npcs')

	// create a npc (accessed at POST http://localhost:8080/npcs)
	.post(function(req, res) {

		var npc = new NPC(req.query);		// create a new instance of the NPC model
		npc.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: "Character Created!" });
		});


	})

	// get all the npcs (accessed at GET http://localhost:8080/api/npcs)
	.get(function(req, res) {
		NPC.find(function(err, npcs) {
			if (err)
				res.send(err);

			res.json(npcs);
		});
	});

// on routes that end in /search/
router.route('/search')
    .get(function(req, res) {
        console.log(req.query);
        NPC.apiQuery(req.query).exec( function(err, npcs) {
            if (err) {
		res.send(err);
		}
			res.json(npcs);
		});

    });


// on routes that end in /npcs/:npc_id
// ----------------------------------------------------
router.route('/npcs/:npc_id')

	// get the npc with that id
	.get(function(req, res) {
		NPC.findById(req.params.npc_id, function(err, npc) {
			if (err)
				res.send(err);
			res.json(npc);
		});
	})

	// update the npc with this id
	.put(function(req, res) {
		NPC.findById(req.params.npc_id, function(err, npc) {

			if (err)
				res.send(err);

			console.log(req.body);
			//npc = req.body;

			npc.title = req.body.title;
			npc.exp = req.body.exp;
			npc.size= req.body.size;
			npc.footprint.x = req.body.footprint.x;
			npc.footprint.y = req.body.footprint.y;
			npc.reach = req.body.reach;
			npc.type = req.body.type;
			npc.mobility.primaryMotionType = req.body.mobility.primaryMotionType;
			npc.mobility.groundSpeed = req.body.mobility.groundSpeed;
			npc.mobility.burrowSpeed = req.body.mobility.burrowSpeed;
			npc.mobility.flySpeed = req.body.mobility.flySpeed;
			npc.mobility.swimSpeed = req.body.mobility.swimSpeed;
			//npc.templates.rogue = req.body.templates.rogue;
			//npc.templates.monster = req.body.templates.monster;
			npc.attributes.strength = req.body.attributes.strength;
			npc.attributes.constitution = req.body.attributes.constitution;
			npc.attributes.intelligence = req.body.attributes.intelligence;
			npc.attributes.wisdom = req.body.attributes.wisdom;
			npc.attributes.charisma = req.body.attributes.charisma;
			npc.attributes.dexterity = req.body.attributes.dexterity;
			npc.traits.initative = req.body.traits.initative;
			npc.traits.attack = req.body.traits.attack;
			npc.traits.defense = req.body.traits.defense;
			npc.traits.resilience = req.body.traits.resilience;
			npc.traits.health = req.body.traits.health;
			npc.traits.competence = req.body.traits.competence;
			npc.signatureSkills = req.body.signatureSkills;
			npc.spellcasting.skilGrade = req.body.spellcasting.skilGrade;
			npc.spellcasting.spells = req.body.spellcasting.spells;
			npc.qualities = req.body.qualities;
			npc.treasure.any = req.body.treasure.any;
			npc.treasure.coin = req.body.treasure.coin;
			npc.treasure.gear = req.body.treasure.gear;
			npc.treasure.loot = req.body.treasure.loot;
			npc.treasure.magic = req.body.treasure.magic;
			npc.treasure.trophies = req.body.treasure.trophies;
			npc.gear.mountsAndVehicles = req.body.gear.mountsAndVehicles;
			npc.gear.gear = req.body.gear.gear;
			npc.attacks = req.body.attacks;

			console.log(npc);
			npc.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'NPC updated!' });
			});

		});
	})

	// delete the npc with this id
	.delete(function(req, res) {
		NPC.remove({
			_id: req.params.npc_id
		}, function(err, npc) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
