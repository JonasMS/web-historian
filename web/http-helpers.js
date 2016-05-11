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




exports.redirect = function(res, asset) {
  res.writeHead(301, {location: asset});
  res.end();
};

exports.notFound = function(res, asset) {
  res.writeHead(404);
  res.end();
};

exports.notImplemented = function(res) {
  res.writeHead(501);
  res.end('Not Implemented');
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, (err, contents) => {
    callback(res, err, contents);
  });
};

// POST
// if err
  // add to sites.txt
  // redirect to loading
// else
  // redirect to archived site

// GET
// if err
  // return 404
// else
  // serve contents
var fileExts = new Set([
  '.html',
  '.css',
  '.js',
  '.jpg',
  '.jpeg',
  '.gif',
  '.png'
]);

exports.isValidFileName = function(file) {
  return fileExts.has(path.parse(file).ext); 
};