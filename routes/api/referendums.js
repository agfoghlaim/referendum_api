const express = require('express');
const router = express.Router();

//Referendum Model
const Referendum = require('../../modals/Referendum');


//GET all referendums
router.get('/', (req, res) => {
	Referendum.find()
		.then(referendums => res.json(referendums))
		.catch(err => res.status(400).json({success:false, msg:err.message}))	
});

//get list of referendum names
router.get('/names', (req, res) => {
	Referendum.find()
		.then(referendums => res.json(referendums.map(r => r.name)))
		.catch(err => res.status(400).json({success:false, msg:err.message}))	
});

//get all referendum names and their ids (_id by default)
router.get('/namesandids', (req, res) => {
	
	Referendum.find()
	.select('name')
	.then(referenda => res.json(referenda))

	//reduce results to names and ids and send response
	// .then(referendums => res.json(referendums.reduce((arr, referendum) => {
	// 	arr.push({name: referendum.name, _id: referendum._id});
	// 		return arr;
	// },[])))
	.catch(err => res.status(400).json({success:false, msg:err.message}))	
});

//get one referendum by id
router.get('/:id', (req, res) =>{
	Referendum.findById(req.params.id)
		.then(referendum => res.json(referendum))
		.catch(err => res.status(400).json({success:false, msg:err.message}))
})

//get all constituencies for one specific referendum
router.get('/:id/constituencies', (req, res) =>{
	Referendum.findById(req.params.id)
		.then(referendum => res.json(referendum.constituencies))
		.catch(err => res.status(400).json({success:false, msg:err.message}))
})

//get one constituency for one specific referendum
router.get('/:id/constituency/:name', (req, res) =>{

	//find referendum by id
	Referendum.findById(req.params.id)

	//filter constituencies by name
	.then(r => r.constituencies.filter(c => c.constituency===req.params.name))

	 //send requested constituency only
	.then(constituencies => {res.json(constituencies)})
	.catch(err => res.status(400).json({success:false, msg:err.message}))	

})



//***get referenda in a particular year
router.get('/year/:year', (req, res) =>{
	Referendum.find({ year: req.params.year})

	//send constituencies (or empty array if no referendum that year)
	 .then(constituencies => res.json(constituencies))
	 .catch(err => res.status(400).json({success:false, msg:err.message}))	
})


/*
get any data.constituencies[?][<key>] key for one specific referendum

*/

//TODO cannot use mongoose .select() etc because there's no _id for constituency array in db
router.get('/:id/constituency/:name/:key/', (req, res) =>{
	//get the referendum in question
	Referendum.findById(req.params.id)

	//get the requested constituency by name
	.then(referendum => referendum.constituencies.filter(c => c.constituency===req.params.name))

	//get the requested key in that one constituency
	.then(constituency => constituency[0][`${req.params.key}`])

	//use req.params.key to reconstruct object and send response
	.then(value => {
	 		const response = {[req.params.key]:value};
	 		return res.json(response)
	})
	.catch(err => res.status(400).json({success:false, msg:err.message}))
})



//route POST api/referendums 
//add referendum

router.post('/', (req, res) => {
	const newReferendum = new Referendum({
		name: req.body.name,
		year: req.body.year,
		description: req.body.description,
		constituencies: req.body.constituencies

	});

	newReferendum.save()
		.then(referendum => res.json(referendum));
});




//route DELETE api/referendums 
//delete referendum

//TODO changed the Referendum model since this code was written 
//ie. broken
router.delete('/:id', (req, res) => {

	Referendum.findById(req.params.id)
		.then(referendum => {referendum.stats.remove(); referendum.remove()})
		.then( () => res.json({success:true}))
		.catch(err => res.status(400).json({success:false}));
});



module.exports = router;

