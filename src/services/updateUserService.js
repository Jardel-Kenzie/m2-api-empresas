import User from "../database/models/user.js"
import pkgBcrypt from 'bcryptjs'
const { hash } = pkgBcrypt;


const updateUserService = async (password, email, username, uuid) => {

    const user = await User.findByPk(uuid)
    if(user && password){
        user.update({
            username,
            password: await hash(password, 8),
            email
        })
    } else if(user){
        user.update({
            username,
            password,
            email
        })
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