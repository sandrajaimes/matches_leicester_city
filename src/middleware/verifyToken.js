require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = async function verifyToken(req, resp, next) {
    try{
        const token = req.headers['authorization'];
        const extractBearer = token.split(" ");

        if(extractBearer[0] === "null" || extractBearer[1] === "null") return resp.status(400).json({message:"Token Empty"});

        let finalyToken;

        if(extractBearer.length === 2){
            finalyToken = extractBearer[1];
        }

        if(extractBearer.length === 1){
            finalyToken = extractBearer[0];
        }

        const decoded = jwt.verify(finalyToken,process.env.KEY_JWT);

        const userExist = User.find({"user":`${decoded.user}`});

        if(userExist.length === 0)return resp.status(404).json({mesage:"User not found"});
        next()

    }catch (e) {
        console.log(e);
        return resp.status(401).json({message:"Token Invalid"})
    }
};
