/**
 * Dependencies.
 */
var mysql = require('mysql')
  , envcfg = require('envcfg')
  , config = envcfg(__dirname + '/../config/config.json');

var db = mysql.createConnection({
  host: config.blendconf.host,
  user: config.blendconf.user,
  password: config.blendconf.password
});

db.connect();

module.exports.db = db;
module.exports.config = config;