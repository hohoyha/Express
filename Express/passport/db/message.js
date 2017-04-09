
module.exports = function(db) {
    var Schema = db.Schema;
    var Message = new Schema({
        title: String,
        content: String,
        author: String
    });

    return db.model('Message', Message);
};
