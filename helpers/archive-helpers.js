var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var querystring = require ('querystring');
var Promise = require('bluebird');
var request = require('request');

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

exports.readListOfUrls = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../test/testdata/sites.txt'), (err, contents) => {
      if (err) { 
        reject(err); 
      } else {
        var list = contents.toString().split('\n');
        if (list[list.length - 1] === '') { list.pop(); }
        resolve(list);        
      }
    });
  });
};

exports.isUrlInList = function(url) {
  return new Promise((resolve, reject) => { 
    exports.readListOfUrls( (list) => {
      resolve(list.indexOf(url) !== -1);
    });
  });
};

exports.addUrlToList = function(url) {
  return new Promise((resolve, reject) => {
    fs.appendFile('test/testdata/sites.txt', url + '\n', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.isUrlArchived = function(url) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, '../test/testdata/sites'), (err, contents) => {
      if (err) { 
        reject(err); 
      } else {
        resolve(contents.indexOf(url) !== -1);
      }
    });
  });
};

exports.downloadUrls = function(urlArray) {
  return new Promise((resolve, reject) => {
    urlArray.forEach(function(url) {
      request('http://' + url, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          fs.writeFile(path.join(__dirname, '../test/testdata/sites/' + url), body, 'utf8', err => { 
            if (err) {
              reject(err); 
            } else {
              resolve();
            }
          });
        }
      });
    });
  });
};

exports.cleanList = function() {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, '../test/testdata/sites.txt'), '', err => {
      if (err) {
        reject(err);
      } else { resolve(); }
    });
  });
};






