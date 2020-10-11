const express = require("express");
const controllerMatches = require("../controllers/matchesControllers");

const router = express.Router();

router.post('/match', controllerMatches.create);

router.get('/results/last-match', controllerMatches.lastMatch);
router.get('/results/one-match/id/:id', controllerMatches.matchById);
router.get('/results/one-match/date/:date', controllerMatches.matchByDate);
router.get('/results/:limit', controllerMatches.lastMatches);
router.get('/results/:startDate/:endDate' ,controllerMatches.lastMatchesByDate);
router.get('/results/points/:startDate/:endDate', controllerMatches.pointsByDate);

module.exports=router;
