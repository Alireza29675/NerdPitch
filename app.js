const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PrettyError = require('pretty-error');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pe = new PrettyError;

const config = require('./config/config');

const auth = require('./routes/auth');
const index = require('./routes/index');
const presentation = require('./routes/presentation');
const api = require('./routes/api')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /dist
//app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'client'),
  dest: path.join(__dirname, 'dist'),
  debug: true,
  outputStyle: 'compressed',
}))
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('express-session')({
  secret: 'cool hackers',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// for passing suffix

app.use(function(req,res,next){
  res.locals.general = {};
  res.locals.general.suffix = ` ${config.general.seprator} ${config.general.suffix}`;
  res.locals.general.description = ` ${config.general.seprator} ${config.general.description}`;
  next();
});

app.use('/',auth);
app.use('/', index);
app.use('/', presentation);
app.use('/api', api);

// passport configuration
var User = require('./server/model/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // rendering errors by Pretty-Error
  console.log('\n' + pe.render(err));

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

pe.skipNodeFiles();
pe.skipPackage('express');

module.exports = app;
