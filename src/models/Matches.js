const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MatcheSchema = Schema({
            idMatch: Number,
            dateMatch: Date,
            nameTeamOne: String,
            teamOneGoals: Number,
            nameTeamTwo: String,
            teamTwoGoals: Number,
            matchResult:String
}, {collection: 'Matches'});

module.exports = mongoose.model('Matches',MatcheSchema);
