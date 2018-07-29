const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const referendums = require('./routes/api/referendums');

const app = express();

//body-parser
app.use(bodyParser.json());

//db

const db = require('./config/handle_db');


//for cors
app.use( (req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


/*
Standard  mongoose.connect(db) with imported MongoURI:'mongodb://<dbuser>:<dbpassword>@<db>.mlab.com:port/referendum'
worked fine until I added handle_db.js which caused an error about malformed uri
breaking up MongoURI - seperated username, password from string and passing them as options to mongoose.connect fixed this
*/
//mongoose.connect(db, {useNewUrlParser: true})
mongoose.connect(db.mongoURI, {user: db.mongoUSR, pass: db.mongoPASS, useNewUrlParser: true})
	.then( () => console.log('mongo connected'))
	.catch( err => console.log(err));

//use routes
app.use('/api', referendums);

app.use((req, res, next) =>{
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error:{
			status: error.status,
			message: error.message
		}
	})
})
	//for local
	const port = process.env.PORT || 5000;

	//for remote
	//const port = process.env.PORT || 8080;

	app.listen(port, () => console.log('server started'));

