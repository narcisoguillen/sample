const Logger       = require('../libs/logger');
const Server       = require('../libs/server');
const nconf        = require('nconf');
const express      = require('express');
const bodyParser   = require('body-parser');
const ServerEngine = {};

ServerEngine.init = function(){
  let settings = nconf.get('server');

  this.app  = express();
  this.http = new Server(settings.http, this.app);

  // wire assets
  this.app.set('view engine', 'html');
  this.app.engine('html', require('ejs').renderFile);
  this.app.use(express.static('public'));

  // process mimes
  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({ extended: false }));

  // Log activity
  this.app.use(function(req, res, next){
    Logger.info({
      message : 'Incomming request',
      description : `[${req.connection.remoteAddress}] ${req.method} ${req.url}`
    });

    return next();
  });

  // CORS
  this.app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    return next();
  });
};

module.exports = ServerEngine;
