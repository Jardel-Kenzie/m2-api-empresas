import pkgBcrypt from 'bcryptjs';

import User from "../database/models/user.js";
import Helper from '../services/helper.js';

const { hash } = pkgBcrypt;
export default class CreateUsers{
    static async executeUser({body}, response){

        const {username, email, password, professional_level, kind_of_work} = body
        
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

        }catch({errors}){
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }

    static async executeAdminUser(request, response){
        const {username, email, password, professional_level, kind_of_work} = request.body
        
        const adminAlreadExist = await User.findOne({
            where:{
                is_admin: true
            }
        })

        
        if(adminAlreadExist){
            return response.status(401).json({error: "admin alread exists!"})
        }

        const passwordHashCode = await hash(password, 8)

        try{
            const userAdmin = await User.create({
                username,
                email,
                password: passwordHashCode,
                professional_level,
                kind_of_work,
                is_admin: true
            })

            return response.status(2001).json(userAdmin)
        }catch({errors}){
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }
}