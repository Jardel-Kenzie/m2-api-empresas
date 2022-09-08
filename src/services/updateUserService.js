import User from "../database/models/user.js"
import pkgBcrypt from 'bcryptjs'
import Helper from "./helper.js";
const { hash } = pkgBcrypt;


const updateUserService = async (password, email, username, uuid, response) => {

    const user = await User.findByPk(uuid)
    if(user && email){
        try{
            user.update({
                username: username || user.username,
                password: await hash(password, 8) || user.password,
            })
        }catch(err){
            return response.status(400).json({error: Helper.organizationErrors(errors)})
        }
    } else if(user){
        try{
            user.update({
                username: username || user.username,
                password: await hash(password, 8) || user.password,
                email: email || user.email
            })
        }catch(err){
            return response.status(400).json({error: Helper.organizationErrors(errors)})
        }
    }

    return user

}

const updateUserAdminService = async (professional_level, kind_of_work, uuid) => {

    const user = await User.findByPk(uuid)
    if(user){
        user.update({
            professional_level,
            kind_of_work
        })
    } 

    return user

}

export  {updateUserService, updateUserAdminService}