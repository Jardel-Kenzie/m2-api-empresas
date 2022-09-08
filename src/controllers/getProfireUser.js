import pkgJwt from 'jsonwebtoken';
const { verify } = pkgJwt
import User from "../database/models/user.js"


export const getProfile = async (request, response) => {
    const [, token] = request.headers.authorization.split(" ")
        
    const uuid =  verify(token, "kenzie", (err, decoded) => {
        if(err){
            return response.status(401).json({error: err.message})
        }
        return decoded.uuid
    })
    
    const alreadUser = await User.findByPk(uuid)
    
    if(alreadUser){
        return response.status(200).json(alreadUser)
    }

    return response.status(404).json({error: "user not exists, verify token"})

        
}