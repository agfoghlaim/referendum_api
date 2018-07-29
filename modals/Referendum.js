const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Constituencey = new Schema({
	constituency:{
		type: String,
		required: true
	},
	electorate:{
		type: String,
		required: true
	},
	totalPoll:{
		type: String,
		required: true
	},
	percentagePoll:{
		type: Number,
		required: true
	},
	votesInFavour:{
		type: String,
		required: true
	},
	votesAgainst:{
		type: String,
		required: true
	},
	spoiltVotes:{
		type: String,
		required: true
	}


});

//Schema for Referendum List
const ReferendumSchema = new Schema({
	_id:{
		type: Schema.Types.ObjectId,
		required:true
	},
	name: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	constituencies: [
	{
		type: Constituencey,
		ref: 'constituency',
		required: true,
	}	
	]
});

module.exports = Referendum = mongoose.model('referendum', ReferendumSchema);