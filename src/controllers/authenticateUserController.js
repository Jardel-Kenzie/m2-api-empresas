import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import User from "../database/models/user.js"


export default class AuthenticateUser{
    static async execute(request, response){
        const {email, password} = request.body

        try{
            const userAlreadExist = User.findOne({
                where:{
                    email
                }
            })
            
            if(!userAlreadExist){
                return response.status(404).json({error: `${email} does not exists!`})
            }
    
            const matchPassword = await compare(password, userAlreadExist.password)
    
            if(!matchPassword){
                return response.status(401).json({error: "password invalid"})
            }
    
            const token = sign({uuid: userAlreadExist.uuid}, "kenzie", {
                subject: toString(userAlreadExist.uuid),
                expiresIn: "10d"
            })
    
            return response.status(200).json({
                token,
                uuid: userAlreadExist.uuid
            })
        }catch(err){
            response.status(err.status).json(err)
        }

    }
}