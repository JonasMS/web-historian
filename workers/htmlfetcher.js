// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');


//get list of urls in sites.txt

//determine which urls in sites.txt need to be fetched

//fetch urls


archive.readListOfUrls(list => {
  var filteredUrls = [];
  var urlCheckCount = 0;
  list.forEach(item => {
    archive.isUrlArchived(item, exists => {
      urlCheckCount++;
      if (!exists) { filteredUrls.push(item); }
      console.log('line 18: ', filteredUrls);
      if (urlCheckCount === list.length) {
        archive.downloadUrls(filteredUrls);
      }
    });
  });
});


  

