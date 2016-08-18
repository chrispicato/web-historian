var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');
var httpHelpers = require('../web/http-helpers');
var querystring = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var url = req.url.slice(1);
  //var parsedUrl = req.url.slice(req.url.indexOf('www.') + 4, req.url.indexOf('.com'));
  if (req.method === 'GET') {
    if (req.url === '/') {
      return new Promise(function(fulfill, reject) {
        fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, results) {
          if (err) {
            console.log(err);
          } else {
            res.end(results);
          }
        });
      });
    } else {
      return new Promise(function(fulfill, reject) {
        fs.readFile(archive.paths.archivedSites + '/' + url, 'utf-8', function(err, results) {
          if (err) {
            console.log(err);
            res.writeHead(404, httpHelpers.headers);
            res.end();
          } else {
            res.end(results);
          }
        });
      });
    }
  }
  if (req.method === 'POST') {
    var datastream = '';
    req.on('data', function(chunk) {
      datastream += chunk;
    });
    req.on('end', function(chunk) {
      var queried = querystring.parse(datastream);
      archive.addUrlToList(queried.url + '\n');
      res.writeHead(302, httpHelpers.headers); 
      fs.readFile(__dirname + '/public/loading.html', 'utf-8', function(err, results) {
        if (err) {
          res.end(results);
        } else {
          res.end(results);  
        }
      }); 
    });
  }



  //res.end(archive.paths.list);
};
