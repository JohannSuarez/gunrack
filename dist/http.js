"use strict";
/*
Start an HTTP server and install Gun by
  passing the server instance to Gun.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const Gun = require("gun");
;
(function() {
  var config = {
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765,
    //peers: process.env.PEERS && process.env.PEERS.split(',') || ['https://gunapp-johann.herokuapp.com/gun']
    peers: process.env.PEERS && process.env.PEERS.split(',') || []

  };
  /*
  if (process.env.HTTPS_KEY) {
    config.key = fs.readFileSync(process.env.HTTPS_KEY);
    config.cert = fs.readFileSync(process.env.HTTPS_CERT);
    config.server = require('https').createServer(config, Gun.serve(__dirname));
  } else {
  */
  // @ts-ignore
  config.server = require('http').createServer(Gun.serve(__dirname));
  //}

  var gun = Gun({ web: config.server.listen(config.port), peers: config.peers });
  console.log('Relay peer started on port ' + config.port);
  module.exports = gun;
}());
