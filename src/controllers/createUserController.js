import pkgBcrypt from 'bcryptjs';
import pkgUuidv4 from 'uuidv4';

import User from "../database/models/user.js";

const { uuid } = pkgUuidv4;
const { hash } = pkgBcrypt;
export default class CreateUsers{
    static async executeUser({body}, response){

        const {username, email, password, professional_level, kind_of_work} = body

        try{
                const idCrypt = uuid()
                
                const passwordHashCode = await hash(password, 8)
                
                const newUser = await User.create({
                    uuid: idCrypt,
                    username,
                    email,
                    password: passwordHashCode,
                    professional_level,
                    kind_of_work,
                    is_admin: false
                })
    
                return response.status(201).json(newUser)
            }catch(errors){
                return response.status(400).json({ error: errors})
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

        const idCrypt = uuid()

        const passwordHashCode = await hash(password, 8)

        try{
            const userAdmin = await User.create({
                uuid: idCrypt,
                username,
                email,
                password: passwordHashCode,
                professional_level,
                kind_of_work,
                is_admin: true
            })

            return response.status(2001).json(userAdmin)
        }catch(err){
            return response.status(201).json({error: err.menssage})
        }
    }
}