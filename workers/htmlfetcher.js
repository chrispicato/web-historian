// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

var toBeArchived = [];

archive.readListOfUrls(function (listOfUrls) {
  _.each(listOfUrls, function (url) {
    archive.isUrlArchived(url, function (trueOrFalse) {
      if (!trueOrFalse) {
        toBeArchived.push(url);
      }
    });
  });
});

setTimeout(function() { archive.downloadUrls(toBeArchived); }, 100);