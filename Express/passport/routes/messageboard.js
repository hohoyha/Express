var route = require('express').Router();

module.exports = function(Message){

    route.get('/', function(req, res){
        Message.find(function(err, messages){
            if(err) return res.status(500).send({error: 'database failure'});
            //  res.json(messages);
            res.render('index', {messages: messages, user: req.user});
        });
    });

    route.get('/write', function(req, res){
        res.render('write',{user: req.user});
    });

    route.post('/write', function(req, res){

        if(req.user){
            var message = new Message();
               message.title = req.body.title;
               message.content = req.body.content;
               message.author = req.user.username;

               message.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }
                    res.redirect('/api/message');
              });
        }
    });


    route.get('/edit/:id', function(req, res){
        Message.findById(req.params.id, function(err, message){
              res.render('edit', {id:req.params.id, message: message, user: req.user} );      
        });
    });


     route.post('/update/:id', function(req, res){

       Message.update({ _id: req.params.id }, { $set: req.body }, 
            function(err, output){
                if(err) res.status(500).json({ error: 'database failure' });
                console.log(output);
                if(!output.n) return res.status(404).json({ error: 'book not found' });
                
                res.redirect('/api/message');
          });
    });

     route.post('/delete/:id', function(req, res){
         Message.remove({ _id: req.params.id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
             
             res.redirect('/api/message');
        });
    });

     route.post('/find', function(req, res){

         var rex = new RegExp(req.body.content);
         Message.find({ title:rex }, function(err, messages){
            if(err) return res.status(500).json({ error: "database failure" });
             
             res.render('index', {messages: messages, user: req.user});
        });
    });

    return route;
}