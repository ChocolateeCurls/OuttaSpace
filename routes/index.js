//Importing schema
const Schema = require("../models/schema.js");
// Cargar modulos y crear nueva aplicacion
var mongoose = require("mongoose");
var cors = require('cors');


const marketrate = mongoose.model('marketrate', Schema, 'marketrate');
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados


//Ejemplo: GET http://localhost:8080/items
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
app.post('/post', function (req, res) {
  var data = req.body.data;

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {


    marketrate.collection.insertOne(data);
    console.log('llego al post!!!!');
    res.status(204).end();
  })

  //res.send('Add ' + data);
});

//Ejemplo: PUT http://localhost:8080/items
app.put('update/:id', function (req, res, next) {
  var itemId = req.body.id;

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {

      marketrate.findOne({_id: itemId}, function(err, foundObject){
        if(err)
        {
          console.log(err);
          res.status(500).send();
        }else{
          if(!foundObject){
            res.status(404).send();
          }else{
            if(req.body.name){
              foundObject.name = req.body.name;
            }
            if(req.body.products){
                foundObject.products = req.body.products;
            }

            console.log("UPDATE CON ID, ;O !!!");
            res.json(updatedObject);
            res.status(204).end();

            foundObject.save(function(err, updatedObject){
              if(err){
                console.log(err);
                res.status(500).send();
              }else{
                res.send(updatedObject);
              }
            });
          }
        }
      });

        //console.log("UPDATE CON ID, ;O !!!");
        //res.json(marketrate);
        //res.status(204).end();
      //res.send('Update ' + itemId + ' with ' + data);
   });
});
//Ejemplo: DELETE http://localhost:8080/items
app.delete('/delete/:id', function (req, res) {
  var itemId = req.params.id;

  mongoose.connect("mongodb://localhost/space", { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB conexs error'));
  db.once("open", function () {

    marketrate.remove({ _id: itemId }, function (err) {


      console.log("item deleted..!")
      res.status(204).end();
    });
  });

  //res.send('Delete ' + itemId);
});

var server = app.listen(8080, function () {
  console.log('Server is running..');
});


module.exports = app;
app.use(cors());