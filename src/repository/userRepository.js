const connectionOk = require("../models/connectDb"),
    model = require("../models/users");

async function getByUsernameAndPassword(username, password) {
    await connectionOk.connect();
    const result = await model.find({"user": username,"password": password});
    await connectionOk.disconnect();
    return result;
}

async function getByUsername(username) {
    await connectionOk.connect();
    const result = await model.find({"user": username});
    await connectionOk.disconnect();
    return result;
}

async function create(payload) {
    await connectionOk.connect();
    const result = await model.insertMany(payload);
    await connectionOk.disconnect();
    return result;
}

module.exports = {
    getByUsernameAndPassword,
    getByUsername,
    create
};
