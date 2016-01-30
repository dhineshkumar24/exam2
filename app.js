/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var employeeProvider= new EmployeeProvider('localhost', 27017);

//Routes

//index
app.get('/', function(req, res){
  employeeProvider.findAll(function(error, emps){
      res.render('index', {
            title: 'Employees',
            users:emps
        });
  });
});

//new employee
app.get('/employee/new', function(req, res){
  employeeProvider.findAll(function(error, emps){
      res.render('employee_new', {
            title: 'Employees',
            users:emps
        });
  });
});

app.post('/', function(req,res){
  this.name = req.param('name');
  this.city = req.param('city');
  res.redirect('/employee/edit');
});

//edit emp
app.get('/employee/edit', function(req, res){
  employeeProvider.findCondition(this.name, this.city, function(error, emps){
      res.render('employee_edit', {
            title: 'Result',
            users:emps
        });
  });
});

app.listen(process.env.PORT || 3000);
