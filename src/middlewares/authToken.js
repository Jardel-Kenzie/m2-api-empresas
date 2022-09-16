import pkgJwt from 'jsonwebtoken';

const { verify } = pkgJwt

export default class AuthToken{
    static async tokenBasic (request, response, next) {
        if(!request.headers){
            return response.status(401).json({error:"headers required"});
        }

        if(!request.headers.authorization){
            return response.status(401).json({error:"header authorization required"});
        }

        const [, token] = request.headers.authorization.split(" ")
        
        if(!token){
            return response.status(401).json({error:"token is missing!"});
        }

        verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: "invalid token"})
            } else if (!decoded.uuid){
                return response.status(401).json({error: "invalid token"})
            } else {
                request.is_admin = decoded.is_admin;
                request.user_uuid = decoded.uuid;
                next()
            }
        })
    }
    
    static async isAdmin(request, response, next){
        const is_admin = request.is_admin;


        if(!is_admin){
            return response.status(401).json({error:"need admin permission to access"})
        }

        next()
    }

    static async hasBasicToken(request, response, next) {
        
        if(request.is_admin)
        {
            return response.status(400).json({error: "you are admin, use the route: users"})
        }
        else next();
    }
}