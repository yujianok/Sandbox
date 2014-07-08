var express = require('express');
var config = require('./config');

var serviceRouter = require('./lib/service_router');

var app = express();
app.use('/rest', serviceRouter);
app.use(express.static(__dirname + '/public'));

var server = app.listen(config.server.port, function() {
	console.log('Listening on port %d', server.address().port);
});