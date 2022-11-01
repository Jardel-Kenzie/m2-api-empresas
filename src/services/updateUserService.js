import User from "../database/models/user.js"
import pkgBcrypt from 'bcryptjs'
import Helper from "./helper.js";
const { hash } = pkgBcrypt;


const updateUserService = async (password, email, username, uuid) => {

    const user = await User.findByPk(uuid)

    
    let newPassword = user.password
    if(password){
        newPassword = await hash(password, 8)
    }
    console.log(newPassword)
    
    if(user && email){
   
        user.update({
            username: username || user.username,
            password: newPassword,
            email: email || user.email
        })
       

    } else if(user){

        user.update({
            username: username || user.username,
            password: newPassword,
        })

    }
   
    const userAfterUpdate = await User.findByPk(uuid, {
        attributes: {exclude: ["password", "is_admin"]}
    })



    return userAfterUpdate

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