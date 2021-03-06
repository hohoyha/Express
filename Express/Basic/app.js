var express = require('express');
var pug = require('pug');
var app = express();
var body = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use( body.urlencoded({extended: false}) );
app.use(cookieParser('ojojafjoasfd')); //add secret key 

app.use( session(
  { secret:'keyboad cat', 
    resave: false, 
    saveUninitialized: true,
    store : new FileStore(),
   }) );


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


app.get('/cookie', function(req, res){
    var count;

    if(req.cookies.count){
        count = parseInt(req.cookies.count) + 1;
    }
    else{
        count = 1 ;
    }

    res.cookie('count', count);
    res.send(count.toString());
});


app.get('/signedcookie', function(req, res){
    var count;

    if(req.signedCookies.count2){
        count = parseInt(req.signedCookies.count2) + 1;
    }
    else{
        count = 0;
    }

    res.cookie('count2', count, {signed:true});
    res.send(count.toString());
});

app.get('/session', function(req, res){
   var value = req.session.count;
   console.log(value);
   
   if( req.session.count !== undefined){
      req.session.count++;
   }else  {
      req.session.count = 0;
   }

    res.send('count: ' + req.session.count);
});


app.listen(3000);