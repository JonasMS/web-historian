var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
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
        helpers.serveAssets(res, 'web/public' + pathname, getCallback);
      } else {
        // serve from archive
        helpers.serveAssets(res, 'test/testdata/sites' + pathname, getCallback);
      }
    }
  } else if (req.method === 'POST') {  //POST (index.html | loading.html)
    if (pathname === '/index.html' || pathname === '/loading.html') {
      // 
    }
  } else {
    helpers.notImplemented(res);
  }
};

// helpers
var postCallback = (res, err, contents) => {
  if (err) {
    //write to sites.txt
    helpers.redirect(res, '/loading.html');
  } else {
    helpers.redirect(res, filename);
    res.writeHead(200);    
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