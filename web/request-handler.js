var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    return new Promise(function(fulfill, reject) {
      fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.end(results);
        }
      });
    });
  }



  res.end(archive.paths.list);
};
