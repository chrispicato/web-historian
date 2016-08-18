var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  callback = callback || _.identity;
  return new Promise(function(fulfill, reject) {
    fs.readFile(exports.paths.list, 'utf-8', function(err, res) {
      if (err) {
        reject(err);
      } else {
        var listOfURLs = res.split('\n');
        if (callback) {
          fulfill(callback(listOfURLs));
        }
        fulfill(listOfURLs);
      }
    });
  });
};

exports.isUrlInList = function(targetURL, callback) {
  callback = callback || _.identity;
  return new Promise (function(fulfill, reject) {
    exports.readListOfUrls(function(listOfURLs) {
      console.log(listOfURLs, targetURL);
      if (callback) {
        fulfill(callback(_.contains(listOfURLs, targetURL)));
      }
    });
  });
};

exports.addUrlToList = function(url, callback) {
  callback = callback || _.identity;
  fs.appendFile(exports.paths.list, url, function(err) {
    if (err) {
      console.log(err);
    } else {
      return callback(url);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  callback = callback || _.identity;
  //var siteName = currentUrl.slice(currentUrl.indexOf('www.') + 4, currentUrl.indexOf('.com'));
  fs.readFile(exports.paths.archivedSites + '/' + url, function(err, res) {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(arrayOfUrls) {
  _.each(arrayOfUrls, function(url) {
    var newFile = fs.openSync(exports.paths.archivedSites + '/' + url, 'w');
    request('http://' + url, function(err, res, body) {
      if (err) {
        console.log(err);
      } else {
        fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(err) {
          if (err) {
            console.log(err);
          }
          console.log('file saved');
        });
      }
    });
  });
  // var listOfURLs = exports.readListOfUrls();
  // for (var i = 0; i < listOfURLs.length; i++) {
  //   var currentUrl = listOfURLs[i];
  //   if (!exports.isUrlArchived(currentUrl)) {
  //     var newFile = fs.openSync(exports.paths.archivedSites + '/' + url, 'w');
  //     request(url, function(err, res, body) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(err) {
  //           if (err) {
  //             console.log(err);
  //           }
  //           console.log('file saved');
  //         });
  //       }
  //     });
  //   }
  // }
};
