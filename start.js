var express = require('express');
var config = require('./config');

var serviceRouter = require('./lib/service_router');
var taobaoRouter = require('./lib/taobao_router');

var tradeMockJob = require('./lib/job/trade_mock_job');

var app = express();
app.use('/rest', serviceRouter);
app.use(express.static(__dirname + '/public'));
app.use('/router/rest',taobaoRouter);

var server = app.listen(config.server.port, function() {
	console.log('Listening on port %d', server.address().port);
});

tradeMockJob.initTestPlan();