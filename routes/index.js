//Importing schema
const Schema = require("../models/schema.js");
// Cargar modulos y crear nueva aplicacion
var mongoose = require("mongoose");

const marketrate = mongoose.model('marketrate', Schema, 'marketrate');
var express = require("express");
var app = express();

var assert = require('assert');
var objectId = require('mongodb').ObjectID;

/* Get home page */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use(express.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT")
  next();
});



//Ejemplo: GET http://localhost:8080/items|
app.get('/get', function (req, res, next) {

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {

    marketrate.find({}).then(function (marketrate) {
      console.log(':) llego al get!!!!');
      res.json(marketrate);
      res.status(204).end();
    });
  })
});

//Ejemplo: GET http://localhost:8080/items?filter=ABC
app.get('/get', function (req, res) {
  var filter = req.query.filter;
  res.send('Get filter ' + filter);
});

//Ejemplo: GET http://localhost:8080/items/10
app.get('/get/:id', function (req, res, next) {

  var itemId = req.params.id;

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {


    marketrate.findById({ _id: itemId }).then(function (marketrate) {
      console.log(' -llego al get con ID!!!! :P');
      res.json(marketrate);
      res.status(204).end();
    });
  })
  //res.send('Get ' + req.params.id);    
});


//Ejemplo: POST http://localhost:8080/items
app.post('/insert', function (req, res) {

  const nItem = {
    name: req.body.name,
    products: req.body.products
  }

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {


    marketrate.collection.insertOne(nItem);
    console.log('llego al post!!!!');
    res.status(204).end();
  })

  //res.send('Add ' + data);
});

//Ejemplo: PUT http://localhost:8080/items
app.put('/update/:id', function (req, res, next) {
  var itemId = req.body._id;

  const upItem = {
    name: req.body.name,
    products: req.body.products
  }

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {

    console.log(itemId);
    console.log(upItem);

    marketrate.collection.findOneAndUpdate({"_id": objectId(itemId)}, {$set: upItem}, function(err, result){
      assert.equal(null, err);
      console.log('Item updated bitch!!!');
      res.status(204).send(upItem);
    });

/*    res.send('Update ' + itemId + ' with ' + data); */
  });
});
//Ejemplo: DELETE http://localhost:8080/items
app.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {

      console.log(id);

    marketrate.collection.deleteOne({"_id": objectId(id)}, function (err) {

      assert.equal(null, err);
      console.log("item deleted..!")
      res.status(204).end();
    });
  });

  //res.send('Delete ' + itemId);
});


module.exports = app;


