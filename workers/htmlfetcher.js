// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

// * * * * * /usr/local/bin/node  /Users/student/2016-04-web-historian/workers/htmlfetcher.js
//get list of urls in sites.txt

//determine which urls in sites.txt need to be fetched

//fetch urls
var filteredUrls = [];
var urlCheckCount = 0;

archive.readListOfUrls()
  .filter(url => archive.isUrlArchived(url).then(exists => !exists))
  .then(list => archive.downloadUrls(list))
  .then(archive.cleanList)
  .then('download completed');
