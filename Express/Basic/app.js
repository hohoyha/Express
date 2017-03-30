var express = require('express');
var app = express();

app.get('/hello', function(req, res){
  res.send('hello world');
});

app.use(express.static('public'));

app.listen(3000);