var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(path.join(__dirname, '../test/testdata/sites.txt'), (err, contents) => {
    var list = contents.toString().split('\n');
    if (list[list.length - 1] === '') { list.pop(); }
    callback(list);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls( (list) => {
    callback(list.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile('test/testdata/sites.txt', url + '\n', callback);
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(path.join(__dirname, '../test/testdata/'), (err, contents) => {
    callback(contents.indexOf(url) !== -1);
  });
};

exports.downloadUrls = function(urlArray) {
};
