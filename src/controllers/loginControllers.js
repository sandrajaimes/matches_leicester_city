require('dotenv').config();
const jwt = require("jsonwebtoken"),
    userRepository = require('../repository/userRepository');

async function login (req, resp){
    try{
        const user = req.body.user,
            password = req.body.password,
            existUser = await userRepository.getByUsernameAndPassword(user, password);

        if(existUser.length === 0){
            resp.status(404).json({
                ok:false,
                message: "Login Failed"
            })
        }

        if(existUser.length > 0){
            const token = jwt.sign({...existUser},process.env.KEY_JWT,{expiresIn:60 * 60});
            resp.status(200).json({
                ok:true,
                user:existUser[0].user,
                token:token
            })
        }

    }catch (e) {
        console.log(e);
        resp.status(500).json({
            ok:false,
            message: "Server Error"
        })
    }
}

module.exports={
    login
};
