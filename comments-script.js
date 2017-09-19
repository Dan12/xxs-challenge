var page = require('webpage').create();
page.settings.webSecurityEnabled = false
page.settings.userAgent = "PhantomJS"
page.settings.XSSAuditingEnabled = false

var content = ""
var cookie = ""

var system = require('system');
var args = system.args;

if (args.length === 3) {
  content = args[1]
  cookie = args[2]
}
console.log("starting web page script with content:")
console.log(content)
console.log(cookie)

page.open('http://localhost:3000/vuln', function(status) {
  phantom.clearCookies();
  
  phantom.addCookie({
    'name'     : 'connect.sid',   /* required property */
    'value'    : cookie,  /* required property */
    'domain'   : 'localhost',
    'path'     : '/vuln',                /* required property */
  });

  var cookies = page.cookies;
  for(var i in cookies) {
    console.log(cookies[i].name + '=' + cookies[i].value);
  }

  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    // page.content = "<html><body>"+content+"</body></html>"
    var title = page.evaluate(function() {
      return document.title
    });
    console.log("title:")
    console.log(title);
  }
  phantom.exit();
});