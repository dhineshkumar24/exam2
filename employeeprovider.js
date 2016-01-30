var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

EmployeeProvider = function(host, port) {
  this.db= new Db('users', new Server(host, port), {safe: false}, {auto_reconnect: true}, {});
  this.db.open(function(){});
};


EmployeeProvider.prototype.getCollection= function(callback) {
  this.db.collection('users', function(error, employee_collection) {
    if( error ) callback(error);
    else callback(null, employee_collection);
  });
};

//find all employees
EmployeeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};



//find using condition
EmployeeProvider.prototype.findCondition = function(name, city, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback( error )
      else {
        employee_collection.find({name: name, city: city}).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


exports.EmployeeProvider = EmployeeProvider;
