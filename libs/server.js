const http   = require('http');
const fs     = require('fs');
const Logger = require('./logger');

module.exports = class Server {
  constructor(settings, app){
    this.settings = settings;

    if(this.settings.key){
      this.settings.key = fs.readFileSync(this.settings.key);
    }

    if(this.settings.cert){
      this.settings.cert = fs.readFileSync(this.settings.cert);
    }

    this.sio = http.createServer(settings.options, app).listen(settings.port, this.onConnected.bind(this));
  }

  onConnected(){
    Logger.info({
      message : 'Server connected',
      description : `PORT : ${this.settings.port}`
    });
  }
}
