var page = require('webpage').create();
page.settings.webSecurityEnabled = false
page.settings.userAgent = "PhantomJS"
page.settings.XSSAuditingEnabled = false

var content = ""

var system = require('system');
var args = system.args;

if (args.length === 2) {
  content = args[1]
}
console.log("starting web page script with content:")
console.log(content)

var numLoaded = 0

var steps = [
  function() {
    var title = page.evaluate(function() {
      var arr = document.getElementsByClassName("login-form");
      var i;
      
      console.log("evaluating...")

      for (i=0; i < arr.length; i++) { 
        if (arr[i].getAttribute('method') == "POST") {

          arr[i].elements["username"].value="CHC";
          arr[i].elements["password"].value="CHCL33t";
          arr[i].submit();
          console.log("submitting")
        }
      }
      
      return document.title
    });
    console.log("title:")
    console.log(title);
  },
  function() {
    console.log("step 2")
    var url = page.evaluate(function(comment) {
      window.location.href = window.location.href + 'messages?comment=' + comment
      return window.location.href
    }, content);
    console.log(url)
  },
  function() {
    console.log("step 3")
    var url = page.evaluate(function() {
      return window.location.href + ' ==== ' + document.title
    });
    console.log(url)
  }
  
  ]
  
  var numSteps = steps.length - 1;

page.onLoadFinished = function() {
  console.log("Loaded:")
  var cookies = page.cookies;
  for(var i in cookies) {
    console.log(cookies[i].name + '=' + cookies[i].value);
  }
  
  if (numLoaded < numSteps) {
    console.log("Step " + numSteps)
    steps[numLoaded]()
    numLoaded++;
  } else {
    steps[numLoaded]()
    console.log("exit...")
    phantom.exit();
  }
};

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.open('http://localhost:8080/login', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    console.log("opened")
  }
});