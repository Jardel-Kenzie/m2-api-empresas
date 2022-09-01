import pkgJwt from 'jsonwebtoken';
import User from '../database/models/user.js';

const { verify } = pkgJwt

export default class authToken{
    static tokenBasic (request, response) {

        const [, token] = request.headers.authorization.split(" ")
        
        if(!token){
            return response.status(401).json({error: "token is missing!"})
        }
        
        const uuid = verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: err.message})
            }

            return  decoded.uuid
        })

        return uuid
    }

    static async isAdmin(request, response, next){
        const uuid = authToken.tokenBasic(request, response)

        const user = await User.findOne({
            where: {
                uuid
            }
        })

        if(!user.is_admin){
            return response.status(401).json({error:"need admin permission to access"})
        }

        next()
    }
}