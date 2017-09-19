const phantomjs = require('phantomjs-prebuilt');
var path = require('path')
var childProcess = require('child_process')
var binPath = phantomjs.path

var cookie = ""

var renderComments = function(comment) {
  var childArgs = [
    path.join(__dirname, 'comments-script.js'),
    comment
  ]
  
  console.log("launching web page script")
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(stdout);
  })
}

module.exports = {renderComments: renderComments}
