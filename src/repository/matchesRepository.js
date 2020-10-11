const connectionOk = require("../models/connectDb"),
    model = require("../models/Matches");

async function getById(id) {
    await connectionOk.connect();
    const result = await model.findOne({"_id": id});
    await connectionOk.disconnect();
    return result;
}
async function getLastMatch() {
    await connectionOk.connect();
    const result = await model.find({}).sort({"dateMatch": 1});
    await connectionOk.disconnect();
    return result;
}

async function getLastMatches(limit = 1) {
    await connectionOk.connect();
    const result = await model.find({}).sort({"dateMatch": 1}).limit(limit);
    await connectionOk.disconnect();
    return result;
}

async function getByDate(date) {
    await connectionOk.connect();
    const result = await model.findOne({"dateMatch": date});
    await connectionOk.disconnect();
    return result;
}

async function getMatchesWithLimit(limit = 10) {
    await connectionOk.connect();
    const result = await model.find({}).limit(limit);
    await connectionOk.disconnect();
    return result;
}

async function getBetweenStartDateAndEndDate(startDate = null, endDate = null) {
    await connectionOk.connect();
    const result = await model.find(
        {
            "dateMatch":
                {
                    "$gte": startDate,
                    "$lte": endDate
                }
        }).sort({"dateMatch": 1});
    await connectionOk.disconnect();
    return result;
}


async function getByFinishResultAndBetweenStartDateAndEndDate(matchResult, startDate = null, endDate = null) {
    await connectionOk.connect();
    const result = await model.find({"matchResult": matchResult, "dateMatch": {"$gte": startDate,"$lte": endDate}});
    await connectionOk.disconnect();
    return result;
}

async function create(payload) {
    await connectionOk.connect();

    const match = new model(payload);

    await match.save();

    await connectionOk.disconnect();
}

module.exports = {
    getLastMatch,
    getById,
    getLastMatches,
    getByDate,
    getMatchesWithLimit,
    getBetweenStartDateAndEndDate,
    getByFinishResultAndBetweenStartDateAndEndDate,
    create
};
