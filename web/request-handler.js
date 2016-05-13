var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var querystring = require ('querystring');
// require more modules/folders here!
exports.handleRequest = function (req, res) {
  console.log(`${req.method} ${req.url}`);

  // remove trailing slashes and query string from url
  var pathname = url.parse(req.url).pathname.replace(/\/$/, '');

  //GET '/' => '/index.html'
  if (req.method === 'GET') {
    if (pathname === '') {
      helpers.redirect(res, '/index.html');
    } else { //GET (public | archive)
      if (helpers.isValidFileName(pathname)) {
        // serve from public
        fs.readFile('web/public' + pathname, (err, contents) => { getCallback(res, err, contents); });
      } else {
        // serve from archive
        fs.readFile('test/testdata/sites' + pathname, (err, contents) => { getCallback(res, err, contents); });
      }
    }
  } else if (req.method === 'POST') {  //POST (index.html | loading.html)
    if (pathname === '/index.html' || pathname === '/loading.html') {
      //get input value
      var body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      }); 

      req.on('end', () => {
        var decodedBody = querystring.parse(body);
        fs.access('test/testdata/sites/' + decodedBody.url, (err) => { postCallback(res, err, decodedBody.url); }); //use input value in place of pathname
      });
    
    } else {
      helpers.notImplemented(res);
    }
  }
};

// helpers
var postCallback = (res, err, sitename) => {
  if (err) {
    //append to sites.txt
    archive.addUrlToList(sitename)
    .then(helpers.redirect(res, '/loading.html'))
    .catch(err => console.log(err));

    fs.appendFile('test/testdata/sites.txt', sitename + '\n', err => {
      if (err) { throw error; }
      console.log('writeToFile succesful');
      // helpers.redirect(res, '/loading.html');
    });
  } else {
    helpers.redirect(res, '/' + sitename);
  }
};

var getCallback = (res, err, contents) => {
  if (err) {
    helpers.notFound(res);
  } else {
    res.writeHead(200);
    res.end(contents);
  }
};


