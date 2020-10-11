const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = Schema({
    user: String,
    password: String,
    role:String
}, {collection: 'Users'});

module.exports = mongoose.model('Users',UsersSchema);
