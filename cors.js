var express = require('express')
var cors = require('cors')
var app = express()

var fetch = require('fetch')
 
app.use(cors())
 
app.get('/items/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})