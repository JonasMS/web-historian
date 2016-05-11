var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  pathname = url.parse(req.url).pathname.replace(/\/$/, '');
  switch (pathname) {
  case '':
    if (req.method === 'GET') {
      pathname = '/index.html';
      helpers.serveAssets(res, pathname, () => {});
    } else if (req.method === 'POST') { 
      console.log(req);
    } else {
      notImplemented(res);
    }
    break;
  default:
    helpers.serveAssets(res, pathname, () => {});
  }
};