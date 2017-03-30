var express = require('express');
var pug = require('pug');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

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

app.get('/sample', function(req, res){
  res.render('sample', { title:'SamplePag', message:'테스트중입니다.' });
});


app.listen(3000);