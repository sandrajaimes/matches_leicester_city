const userRepository = require('../repository/userRepository');

async function addUser (request, response){
    try{
        const user = request.body.user,
            password = request.body.password,
            role = request.body.role;

        if(user === null || user === undefined){response.status(400).json({message:"The username is required"})}
        if(user === null || user === undefined){response.status(400).json({message:"The password is required"})}

        const existUser = await userRepository.getByUsername(user);

        if(existUser.length > 0){ response.status(400).json({message:"User exist"})}

        if(existUser.length === 0){
            const sendOk = await userRepository.create({
                user:user,
                password:password,
                role: role || "invited"
            });

            response.status(200).json({
                ok:true,
                _id:sendOk[0]._id
            })
        }

    }catch (e) {
        response.status(500).json({
            ok:false,
            message:"Server Error"
        })
    }
}

module.exports={
    addUser
};
