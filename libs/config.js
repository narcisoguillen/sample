const nconf  = require('nconf');
const Logger = require('./logger');

const Configuration = {};

Configuration.init = function(){
  nconf.argv().env();

  let environment = nconf.get('NODE_ENV') || 'development';
  nconf.file({ file: `config/${environment}.json` });

  Logger.info({
    message : 'Configuration ready',
    description : `Environment : ${environment}`
  });
};

module.exports = Configuration;
