Express 사용하기
    var express = require('express');
    var app = express();

정작 파일 사용
    app.use(express.static('public'));

웹페이지 표현 
    var output = `
    <!DOCTYPE html>
    <html>'   </html>`;

템플릿 엔진
    app.set('view engine', 'jade');
    app.set('views', './views');
  표시 ( app.get('/template', function(req, res){ } )
    res.render('temp', {time:Date(), title:'Jade'});

URL을 이용한 정보의 전달
      쿼리 스트링 (/topic?id=0)
          req.query.id 

     app.get('/topic/:id/:mode', function(req, res) {
        res.send(req.params.id+','+req.params.mode);
     }

Express-POST 방식 GET
    HTML
        form action ='/url' method='post' or method='get'
        매개 변수 
           input name='title' 
        전달
           input type ='submit
    node.js
        var body = require(body-parser);
        app.use( body.urlencoded({extended: false}) );
        app.post('/topic', function(req, res) { 
            var title =  req.body.title;
        })
  
  파일 업로드

  cookie
      var cookieParser = require('cookie-parser');
    일반 
      app.use(cookieParser());
      req.cookies.count // 가져오기
      res.cookie('count', 1); // 세팅 
    암호화
      app.use(cookieParser('암호key'));
      req.signedCookiescount;
      res.cookie('count', 1, {signed:true});

    Session
      var session = require('express-session');
      app.use(session{ secret:'keyboad cat', resave: false, saveUninitialized: true });
      var count =  req.session.count; //가져오기 
      req.session.count = 1; // 세팅
      파일 저장
         var fileStore =  require('session-file-store')(session);
         app.use(session{ ... store: new FileStore() } );
    


  
