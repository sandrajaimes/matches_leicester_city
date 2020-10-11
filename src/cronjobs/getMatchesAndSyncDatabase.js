const axios = require("axios"),
    R = require("ramda"),
    matchesRepository = require('../repository/matchesRepository');

function findTeamByName(name, teams = [], match = true) {
    const findTeam = teams.filter((row) => {
        if (!match) {
            return row.team.name !== name
        }  else {
            return row.team.name === name
        }
    });

    return (findTeam && findTeam.length > 0) ? findTeam[0] : null;
}

/**
 * @description
 * @param limit
 * @return {Promise<void>}
 */
async function getMatchesAndSyncDatabase(limit = 60) {
    try{
        const results = await axios.get(`https://footballapi-lcfc.pulselive.com/football/fixtures?teams=26&comps=1,4,5,2,210&compSeasons=&homeTeams=&page=0&pageSize=${limit}&sort=desc&statuses=C&altIds=true&provisional=false&detail=2`);

        let idsInDB=[],
            matchResult;
        const matchesInOwnDB = await matchesRepository.getLastMatches(limit);
        matchesInOwnDB.forEach(item => idsInDB.push(item.idMatch));

        for (let i=0; i < results.data.content.length; i++){

            const apiMatchId = results.data.content[i].id,
                apiMatchDateRaw = R.pathOr(null , ['kickoff', 'label'], results.data.content[i]),
                apiMatchTeams = results.data.content[i].teams;


            if(
                !idsInDB.includes(apiMatchId)
                && apiMatchDateRaw
                && Array.isArray(apiMatchTeams)
                && apiMatchTeams.length >= 2
            ) {
                const apiMatchDate = apiMatchDateRaw.substring(0, apiMatchDateRaw.length - 3),
                    lcfcTeam = findTeamByName('Leicester City', apiMatchTeams),
                    opponentTeam = findTeamByName('Leicester City', apiMatchTeams, false);

                if(lcfcTeam){
                    if(parseInt(lcfcTeam.score) > parseInt(opponentTeam.score)){
                        matchResult="Won"
                    }
                    if(parseInt(lcfcTeam.score) < parseInt(opponentTeam.score)){
                        matchResult="Lost"
                    }
                    if(parseInt(lcfcTeam.score) === parseInt(opponentTeam.score)){
                        matchResult="Tie"
                    }

                    await matchesRepository.create({
                        idMatch: apiMatchId,
                        dateMatch: new Date(Date.parse(apiMatchDate)),
                        nameTeamOne: lcfcTeam.team.name,
                        teamOneGoals: lcfcTeam.score,
                        nameTeamTwo: opponentTeam.team.name,
                        teamTwoGoals: opponentTeam.score,
                        matchResult: matchResult
                    });
                }

            }

        }
        console.log("successfully completed registrations")
    }catch (e) {
        console.log("Error get matches",e)
    }
}

module.exports = getMatchesAndSyncDatabase;
