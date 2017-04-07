
module.exports = function(db) {
    var Schema = db.Schema;
    var Account = new Schema({
        username: String,
        password: String,
        displayName: String
    });

    return db.model('Account', Account);
};
