import { hash } from "bcryptjs";
import { v4 } from "uuidv4"

import User from "../database/models/user.js";

export default class CreateUsers{
    static async executeUser(request, response){

            const {username, email, password, professional_level, kind_of_work} = request.body

            const userAlreadExist = await User.findOne({
                where: {
                    email
                }
            })
            
            if(userAlreadExist){
                return response.status(409).json({error: "user email alread exists!"})
            }
            
            try{
                const idCrypt = v4()

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

    
                return response.status(2001).json(newUser)
            }catch(error){
                return response.status(400).json({error: error.mensage})
            }
    }

    static async executeAdminUser(request, response){
        const {username, email, password, professional_level, kind_of_work} = request.body

            const userAlreadExist = User.findOne({
                where: {
                    email
                }
            })

            if(userAlreadExist){
                return response.status(409).json({error: "user email alread exists!"})
       z     }

            const adminAlreadExist = User.findOne({
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
                return response.status(201).json({error: err.mensage})
            }
    }
}