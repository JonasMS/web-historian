var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.docRoot = 'web/public';

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.notFound = function(res) {
  res.writeHead(404);
  res.end('Not Found');
};

exports.notImplemented = function(res) {
  res.writeHead(501);
  res.end('Not Implemented');
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(exports.docRoot + pathname, (err, contents) => {
    if (err) {
      exports.notFound(res);
    } else {
      res.writeHead(200);
      res.end(contents);
    }
    callback();
  });
};

// As you progress, keep thinking about what helper functions you can put here!
