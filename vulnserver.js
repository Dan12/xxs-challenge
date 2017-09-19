var express = require('express'),
app = express(),
session = require('express-session'),
flash = require('connect-flash'),
auth = require('./auth.js'),
bodyParser = require('body-parser');

const commentsRenderer = require('./comments')

app.use('/', express.static(__dirname + '/public'));

app.use(session({ 
  secret: 'some-secret',
  saveUninitialized: false,
  resave: true,
  cookie: { httpOnly: false, secure: false, maxAge: null }
}));

app.use(require('cookie-parser')());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Tells app to use password session
app.use(auth.initialize());
app.use(auth.session());

app.use(flash());

// Set up routes
app.get('/', function(req, res) {
  if(req.user) {
      res.send(
          '<p>You\'re logged in as <strong>' + req.user.username + '</strong>.</p>'
          + '<p><a href="/logout">Log out</a></p>'
          + '<p>As a reminder, the flag is: CHC{xx5_f7w}<p>'
      );
  }
  else {
      res.send(
        '<p><a href="/login">Login</a></p>'
        + '<p>Or submit a comment:</p>'
        + '<form class="login-form" action="/comment" method="POST">'
        + '<p><input name="comment"></p>'
        + '<p><input type="submit" value="Submit"></p>'
        + '<p style="color: red;">' + req.flash('error') + '</p>'
        + '</form>'
      );
  }
});

app.get('/login', function(req, res) {
res.send(
    '<form class="login-form" action="/login" method="POST">'
    + '<h2>Login</h2>'
    + '<p><input name="username"></p>'
    + '<p><input name="password"></p>'
    + '<p><input type="submit" value="Login"></p>'
    + '<p style="color: red;">' + req.flash('error') + '</p>'
    + '</form>'
    
);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/login', function(req, res) {
  console.log("logging in...")
  auth.authenticate('login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
  })(req, res);
}
);

app.post('/comment', function(req, res) {
  console.log(req.body);
  commentsRenderer.renderComments(req.body['comment'])
  res.send("Thanks");
});

app.get('/messages', function(req, res) {
  if (req.user) {
    console.log("looking at messages:")
    console.log(req.query)
    res.send("<html><body><p>New Message:</p>"+req.query["comment"]+"</body></html>"); 
  } else {
    res.send("<p>You're not admin. Get out.</p>");
  }
});

var server = app.listen(8080, function() {
var port = server.address().port;

console.log('Server running on http://127.0.0.1:%s', port);
});