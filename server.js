var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 5000);
  app.set('views', path.join(__dirname, 'app/view'));
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res) { 
  res.send('ok');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Pinbrowser 서버가 ' + app.get('port') + '포트에서 동작합니다.');
});
