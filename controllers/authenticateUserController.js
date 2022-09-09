import pkgCrypt from 'bcryptjs';
import pkgJwt from 'jsonwebtoken';
import User from "../database/models/user.js"
import Helper from '../services/helper.js';

const { compare } = pkgCrypt;
const { sign } = pkgJwt;

export default class AuthenticateUser{
    static async execute(request, response){
        const {email = "", password} = request.body
        
        
        const userAlreadExist = await User.findOne({
            where:{
                email
            }
        })
        
        if(!userAlreadExist){
            return response.status(404).json({error: `email invalid!`})
        }

        if(!password){
            return response.status(401).json({error: "required password!"})
        }
        
        
        try{
            const matchPassword = await compare(password, userAlreadExist.password)
            
            if(!matchPassword){
                return response.status(401).json({error: "password invalid!"})
            }

            const token = sign({uuid: userAlreadExist.uuid, is_admin: userAlreadExist.is_admin}, "kenzie", {
                subject: toString(userAlreadExist.uuid, userAlreadExist.is_admin),
                expiresIn: "10d"
            })
        
            return response.status(200).json({
                token,
                is_admin: userAlreadExist.is_admin,
                uuid: userAlreadExist.uuid
            })

        }catch(errors){
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }

    }
}