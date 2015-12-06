var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    fs = require('fs'),
    sassMiddleware = require("node-sass-middleware"),
    minify = require('express-minify'),
    paginate = require("express-paginate");


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');

app.use(
  sassMiddleware({
    src: __dirname + "/../assets/scss",
    dest: __dirname + "/../public/css",
    prefix:  '/css',
    debug: true
  })
);

/* The line below should be strung on when not in dev mode */
// .use(minify());

// TODO Minify CSS & JS, uglify JS when not in dev mode

app.use(paginate.middleware(10, 10));

app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../data')));
app.use(express.static(path.join(__dirname, '/../assets')));

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('../controllers/' + file);
      route.controller(app);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});