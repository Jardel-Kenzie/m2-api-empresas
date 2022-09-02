import pkgBcrypt from 'bcryptjs';

import User from "../database/models/user.js";
import Helper from '../services/helper.js';

const { hash } = pkgBcrypt;
export default class CreateUsers{
    static async executeUser({body}, response){

        const {username, email, password, professional_level, kind_of_work} = body
        
        if(!password){
            return response.status(400).json({error: "required field password!"})
        }
        const passwordHashCode = await hash(password, 8)
        
        
        try{
            const newUser = await User.create({
                username,
                email,
                password: passwordHashCode,
                professional_level,
                kind_of_work
            })
        
            return response.status(201).json(newUser)

        }catch(errors){
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }
}