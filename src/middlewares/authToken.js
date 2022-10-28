import pkgJwt from 'jsonwebtoken';

const { verify } = pkgJwt

export default class AuthToken{
    static async isAdmin(request, response, next){
        if(!request.headers){
            return response.status(401).json({error: "headers required"})
        }

        if(!request.headers.authorization){
            return response.status(401).json({error: "header authorization required"})
        }

        const [, token] = request.headers.authorization.split(" ")
        
        
        if(!token){
            return response.status(401).json({error: "token is missing!"})
        }

        verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: "invalid token"})
            }else if(!decoded.is_admin){
                return response.status(400).json({error: "need admin permission to access"})
            }else if(!decoded.uuid){
                return response.status(401).json({error: "invalid token"})
            }else {
                next()
            }
        })

    }

    static async validateUser(request, response){
        if(!request.headers){
            return response.status(401).json({error: "headers required"})
        }
        
        if(!request.headers.authorization){
            return response.status(401).json({error: "header authorization required"})
        }

        const [, token] = request.headers.authorization.split(" ")
        
        if(!token){
            return response.status(401).json({error: "token is missing!"})
        }

        
        const user = verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: "invalid token"})
            }else if(!decoded.uuid){
                return response.status(401).json({error: "invalid token"})
            }

            return decoded.is_admin
            
        })

       
        return response.status(200).json({"is_admin": user})
        
    }

    static async hasBasicToken(request, response, next) {
        if(!request.headers){
            return response.status(401).json({error: "headers required"})
        }
        
        if(!request.headers.authorization){
            return response.status(401).json({error: "header authorization required"})
        }

        const [, token] = request.headers.authorization.split(" ")
        
        if(!token){
            return response.status(401).json({error: "token is missing!"})
        }

        
        verify(token, "kenzie", (err, decoded) => {
            if(err){
                return response.status(401).json({error: "invalid token"})
            }else if(decoded.is_admin){
                return response.status(400).json({error: "you are admin, use the route: users"})
            }else if(!decoded.uuid){
                return response.status(401).json({error: "invalid token"})
            }else {
                next()
            }
        })

    }
}