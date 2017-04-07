var mongoose  = require('mongoose');

module.exports = function() {
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function(){
        // CONNECTED TO MONGODB SERVER
        console.log("Connected to mongod server");
    });
    
    mongoose.connect('mongodb://localhost/mongodb_tutorial');

    return mongoose;
}

