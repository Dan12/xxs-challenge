const phantomjs = require('phantomjs-prebuilt');
var path = require('path')
var childProcess = require('child_process')
var binPath = phantomjs.path

var cookie = "s%3A3eMi3bwm-0b_lBDEn6rM5TXj45AFThJ6.LOdY%2F0WLCPhbMcTbK6rZPAIuZ83rbRDFMP7eHSTrsdA"

var renderComments = function(comment) {
  var childArgs = [
    path.join(__dirname, 'comments-script.js'),
    comment,
    cookie
  ]
  
  console.log("launching web page script")
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(stdout);
  })
}

module.exports = {renderComments: renderComments}
