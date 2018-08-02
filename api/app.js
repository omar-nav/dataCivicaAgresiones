// --Invocar paquetes previamente creados mediante "npm install" (definidos en el package.json)
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// --Invocar archivos de la carpeta routes/
var indexRouter = require('./routes/index');
var personasRouter = require('./routes/personas');
var agresionesRouter = require('./routes/agresiones');

// --Variable app tiene la instancia de nuestro servidor (por eso en delante se usa app para todas las configuraciones y manejo de rutas)
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --Se configuran las rutas http://localhost:3000/ (http://[host]:[puerto]/) y http://localhost:3000/personas (http://[host]:[puerto]/personas)
app.use('/', indexRouter);
// --En este ejercicio vamos a ocupar personasRouter (routes/personas.js)
app.use('/personas', personasRouter);
app.use('/agresiones', agresionesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
