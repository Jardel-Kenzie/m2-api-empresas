import pkgJwt from 'jsonwebtoken';
import User from '../database/models/user.js';

const { verify } = pkgJwt

export default class AuthToken{
    static async tokenBasic (request, response) {
        if(!request.headers.authorization){
            return response.status(401).json({error: "header authorization required"})
        }

        const [, token] = request.headers.authorization.split(" ")
        
        if(!token){
            return response.status(401).json({error: "token is missing!"})
        }

        
        const uuid =  verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: err.message})
            }

            return decoded.uuid
        })
        
        return uuid
    }
    
    static async isAdmin(request, response, next){
        const uuid = await AuthToken.tokenBasic(request, response)

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

    static async hasBasicToken(request, response, next) {
        if(!request.headers.authorization){
            return response.status(401).json({error: "header authorization required"})
        }

        const [, token] = request.headers.authorization.split(" ")
        
        if(!token){
            return response.status(401).json({error: "token is missing!"})
        }

        
        const uuid =  verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: err.message})
            }

            return decoded.uuid
        })

        next()
    }
}