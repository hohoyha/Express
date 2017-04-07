var records = [
    { uid: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { uid: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(uid, cb) {
  process.nextTick(function() {
     for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.uid === uid ) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.addUser = function(cb) {
  
    if( cb.uid === 0 ){
       cb.uid = records.length + 1;
    }

    records.push(cb);
}

exports.findOrCreate = function( user, cb){

    exports.findByUsername(user.username, function(err, find){
        if(err) return console.log("findOrCreate");
        
        if(!find){
           exports.addUser(user);
        }else {
          user = find;
        }

        return cb(null, user);
    });  
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
