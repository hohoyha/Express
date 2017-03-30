var express = require('express');
var app = express();

app.get('/hello', function(req, res){
   res.send('hello world');
});

app.get('/staticTest', function(req, res){
  var output = `<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
 <h2> Static Test </h2>
</body>
</html>
`
  res.send(output);
});

app.use(express.static('public'));

app.listen(3000);