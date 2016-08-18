// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

var toBeArchived = [];

archive.readListOfUrls(function (listOfUrls) {
  _.each(listOfUrls, function (url) {
    archive.isUrlArchived(url, function (trueOrFalse) {
      if (!trueOrFalse) {
        toBeArchived.push(url);
      }
    });
  });
  archive.downloadUrls(toBeArchived);
});