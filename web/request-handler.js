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
        helpers.serveAssets(res, 'web/public' + pathname, getCallback);
      } else {
        // serve from archive
        helpers.serveAssets(res, 'test/testdata/sites' + pathname, getCallback);
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
        helpers.serveAssets(res, 'test/testdata/sites/' + decodedBody.url, postCallback); //use input value in place of pathname
      });
    
    } else {
      helpers.notImplemented(res);
    }
  }
};

// helpers
var postCallback = (res, err, contents) => {
  if (err) {
    //write to sites.txt
    console.log('contents cb: ', contents);

    fs.appendFile('test/testdata/sites.txt', contents, err => {
      if (err) { throw error; }
      console.log('writeToFile succesful');
    });

    helpers.redirect(res, '/loading.html');
  } else {
    helpers.redirect(res, contents);
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


