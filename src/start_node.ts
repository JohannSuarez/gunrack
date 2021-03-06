/*
Start an HTTP server and install Gun by
  passing the server instance to Gun.
*/

import * as fs from 'fs';
import Gun = require('gun');


; (function() {

  var config: any = {
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765,
    peers: process.env.PEERS && process.env.PEERS.split(',') || []
  };

  // @ts-ignore
  config.server = require('http').createServer(Gun.serve(__dirname));
  //}

  var gun = Gun({ web: config.server.listen(config.port), peers: config.peers });

  console.log('Relay peer started on port ' + config.port + ' with /gun');
  module.exports = gun;
}());
