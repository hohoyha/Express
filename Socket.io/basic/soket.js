
var io = require('socket.io');


module.exports.startIo = function(server){
    io = io.listen(server);
    var game = io.of('/game');
    game.on('connection', startgame);
};

var initPack = {player:[], bullet:[]};
var removePack = {player:[], bullet:[]};


var Entity = function(param){
    var self = {
        x:250,
        y:250,
        spdX:0,
        spdY:0,
        id:"",
    }

    if(param) {
        if(param.x) {
            self.x = param.x;
        }
        if(param.y) {
            self.y = param.y;
        }
        if(param.id) {
            self.id = param.id;
        }
    }

    self.update = function() {
        self.updatePosition();
    }

    self.updatePosition = function() {
        self.x += self.spdX;
        self.y += self.spdY;
    }

     return self;
}


var Player = function(param) {
    var self = Entity(param);
    self.hp = 10;

    var super_update = self.update;
    self.update = function() {
        self.updateSpd();
        super_update();
    }

    self.updateSpd = function() {

    }

     self.getUpdatePactk = function() {
         return {
            id:self.id,
            x:self.x,
            y:self.y,
         };
     }

      self.getInitPack = function() {
         return {
            id:self.id,
            x:self.x,
            y:self.y,
            hp:self.hp,
         };
     }

    Player.list[self.id] = self;
    initPack.player.push( self.getInitPack());

    return self;
}

Player.list = {};

Player.onConnect = function(socket) {

    var player = Player({
         id:socket.id,
     });

     socket.emit('init', {
         selfId:socket.id,
         player: Player.getAllInitPack(),
     });
}

Player.getAllInitPack = function() {
    var players = [];
    for(var i in Player.list){
        players.push(Player.list[i].getInitPack());
    }

    return players;
}

Player.update = function() {
    var pack = [];

    for(var i in Player.list){
        var player = Player.list[i];
        player.update();
        pack.push( player.getUpdatePactk() );
    }

    return pack;
}

Player.onDisConnect = function(socket) {
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
}



var startgame = function (socket){
    Player.onConnect(socket);
  
    var pack = {
        player : Player.update(),
    }

    socket.emit('init', initPack);
    socket.emit('update', pack);
    socket.emit('remove', removePack);


    setInterval( function() {
        socket.emit('message', {message:'Hey'});
    }, 1000/25);
}




/*
io.sockets.on('connection', function(socket){
    
     socket.on('join', function(data){
        socket.broadcast.emit('userJoined', data);
        socket.username = data.username;
        console.log("join " +  data.username);
    });

     socket.on('pingping', function(data, done){
        console.log("pingping :" + socket.username);
        io.sockets.emit('pingping', {username:socket.username} );
        done('ack');
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('userDisconnect', {username: socket.username});
    });
});
*/