//use local hardcoded config if not in production, otherwise use heroku env variables
if(process.env.NODE_ENV === 'production'){
	module.exports = require('./mlab_prod')
}else{
	module.exports = require('./mlab_dev');
}