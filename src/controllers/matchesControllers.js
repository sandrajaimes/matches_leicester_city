const MatchesRepository = require ('../repository/matchesRepository');

async function create(request, response){
    try{
        const dataMatch = request.body;

        if(dataMatch.dateMatch === null || dataMatch.dateMatch === undefined
            && dataMatch.nameTeamOne === null || dataMatch.nameTeamOne === undefined
            && dataMatch.teamOneGoals === null || dataMatch.teamOneGoals === undefined
            && dataMatch.nameTeamTwo === null || dataMatch.nameTeamTwo === undefined
            && dataMatch.teamTwoGoals === null || dataMatch.teamTwoGoals === undefined
            && dataMatch.matchResult === null || dataMatch.matchResult === undefined
        ){
            response.status(400).json({message:"Required data to create the match is missing"})
        }

        let Match = await MatchesRepository.create({
            idMatch: dataMatch.idMatch || null,
            dateMatch: new Date(Date.parse(dataMatch.dateMatch)),
            nameTeamOne: dataMatch.nameTeamOne,
            teamOneGoals: dataMatch.teamOneGoals,
            nameTeamTwo: dataMatch.nameTeamTwo,
            teamTwoGoals: dataMatch.teamTwoGoals,
            matchResult: dataMatch.matchResult
        });

        await MatchesRepository.create(Match);
        response.status(200).json({message:"The match has been added successfully"})
    }catch (e) {
        console.log("matchesController - add: ",e);
        response.status(500).json({
            "message": "Server Error"
        })
    }
}

async function lastMatch(request, response){
    try{
        const resultQuery = await MatchesRepository.getLastMatch();
        response.status(200).json(resultQuery[resultQuery.length-1])
    }catch (e) {
        console.log("matchesController - LastMatch: ",e);
        response.status(500).json({
            "message": "Server Error"
        })
    }
}

async function matchById(request, response){
        try{
            const matchId = request.params.id;

            if(matchId === null || matchId === undefined){
                response.status(400).json({message:"The id is empty"})
            }

            if(Number(matchId)){
                response.status(400).json({message:"The id is a number"})
            }

            const resultQuery = await MatchesRepository.getById(matchId);

            if(!resultQuery){
                response.status(404).json({message:"Id not found"})
            }

            response.status(200).json(resultQuery)
        }catch (e) {
            console.log("matchesController - matchById: ",e);
            response.status(500).json({
                "message": "Server Error"
            })
        }
}

async function matchByDate(request, response){
    try{
        const matchDate = request.params.date;

        if(matchDate === null || matchDate === undefined){
            response.status(400).json({message:"The Date is empty"})
        }

        if(isNaN(Date.parse(matchDate))){response.status(400).json({mesage:"The date format is not correct"})}

        const resultQuery = await MatchesRepository.getByDate(matchDate);

        response.status(200).json(resultQuery)
    }catch (e) {
        console.log("matchesController - matchByDate: ",e);
        response.status(500).json({
            "ok":false,
            "message": "Server Error"
        })
    }
}

async function lastMatches(request,response){
    try{
        const limit = parseInt(request.params.limit),
            resultQuery = await MatchesRepository.getMatchesWithLimit(limit);

        response.status(200).json(resultQuery)
    }catch (e) {
        console.log("Controller matchById",e);
        response.status(500).json({
            "message": "Server Error"
        })
    }
}

async function lastMatchesByDate(request,response){
    try{
        const startDate = request.params.startDate,
            endDate = request.params.endDate;

        if(startDate === null || startDate === undefined){
            response.status(400).json({message:"The Start date is empty"})
        }
        if(endDate === null || endDate === undefined){
            response.status(400).json({message:"The End date is empty"})
        }

        if(isNaN(Date.parse(startDate))){response.status(400).json({mesage:"The Start date format is not correct"})}
        if(isNaN(Date.parse(endDate))){response.status(400).json({mesage:"The End date format is not correct"})}

        const resultQuery = await MatchesRepository.getBetweenStartDateAndEndDate(startDate, endDate);

        response.status(200).json(resultQuery)
    }catch (e) {
        console.log("Controller matchById",e);
        response.status(500).json({
            "message": "Server Error"
        })
    }
}

async function pointsByDate(request,response){
    try{
        const startDate = request.params.startDate,
            endDate = request.params.endDate;

        if(startDate === null || startDate === undefined){
            response.status(400).json({message:"The Start date is empty"})
        }
        if(endDate === null || endDate === undefined){
            response.status(400).json({message:"The End date is empty"})
        }

        if(isNaN(Date.parse(startDate))){response.status(400).json({mesage:"The Start date format is not correct"})}
        if(isNaN(Date.parse(endDate))){response.status(400).json({mesage:"The End date format is not correct"})}

        const won = await MatchesRepository.getByFinishResultAndBetweenStartDateAndEndDate("Won", startDate, endDate),
            tie = await MatchesRepository.getByFinishResultAndBetweenStartDateAndEndDate("Tie", startDate, endDate),
            lost = await MatchesRepository.getByFinishResultAndBetweenStartDateAndEndDate("Lost", startDate, endDate);

        response.status(200).json({
            "nameTeam": won[0].nameTeamOne,
            "won": won.length,
            "tie":tie.length,
            "lost":lost.length,
            "points": ((won.length * 3) + tie.length)
        })
    }catch (e) {
        console.log("Controller matchById",e);
        response.status(500).json({
            "message": "Server Error"
        })
    }
}


module.exports={
    create,
    lastMatch,
    matchById,
    matchByDate,
    lastMatches,
    lastMatchesByDate,
    pointsByDate
};
