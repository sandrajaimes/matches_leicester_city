require('dotenv').config();

const cron = require("node-cron");
const express = require("express");
const bodyParser = require('body-parser');
const privateRoutes = require('./src/routers/private');
const publicRoutes = require('./src/routers/public');
const verifyTokenMiddleware = require("./src/middleware/verifyToken");

const getMatchesAndSyncDatabase = require("./src/cronjobs/getMatchesAndSyncDatabase");

const app = express();

app.set("llave",process.env.KEY_JWT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(publicRoutes);
app.use(verifyTokenMiddleware);
app.use(privateRoutes);


// schedule tasks to be run on the server
cron.schedule(process.env.CRONJOB_CONFIG || "1-30 23 * * *", async function () {
   console.log("cron date: ", new Date());
   console.log("Running Cron Job");
   await getMatchesAndSyncDatabase();
}, {
   scheduled: true,
   timezone: "America/Argentina/Buenos_Aires"
});

app.listen(3000,async ()=>{
   await getMatchesAndSyncDatabase();
   console.log(`Server start in port 3000`)
});
