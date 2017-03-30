var express = require('express');
var pug = require('pug');
var app = express();
var body = require('body-parser');

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use( body.urlencoded({extended: false}) );


app.use('*', function(req, res, next){
    console.log("midle ware use");
    next();
});

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
  res.render('sample', { title:'SamplePage', message:'테스트중입니다.' });
});

 app.get('/topic/:id/:mode', function(req, res) {
        res.send(req.params.id+','+req.params.mode);
     });

 app.get('/form', function(req, res){
    res.render('form',{ title:'FormPage'});
});

app.post('/postform', function(req, res){
    var title = req.body.title;
    var context = req.body.context;
    var output = title + ': ' + context;

    res.render('postResult', {title:"Result", result:output });

});

app.listen(3000);