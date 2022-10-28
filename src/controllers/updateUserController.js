import {updateUserAdminService, updateUserService} from '../services/updateUserService.js'
import pkgJwt from 'jsonwebtoken'
import Helper from '../services/helper.js'
import User from '../database/models/user.js'

const { verify } = pkgJwt

const updateUserController = async (request, response) => {
    const { password="", email="", username="" } = request.body


    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && email){
        return response.status(400).json("email is invalid")
    }

    if(username.trim().length === 0 && username){
        return response.status(400).json("username invalid")
    }

    if(password.trim().length === 0 && password){
        return response.status(400).json("password invalid")
    }

    const emailExists = await User.findOne({
        where:{
            email  
        }
    }).catch(err => console.log(err))

    if(emailExists){
        return response.status(400).json({error: "email alread exists"})
    }

    try{
        const [, token] = request.headers.authorization.split(" ")

        const uuid = verify(token, "kenzie", (_, decoded) => {
            return decoded.uuid
        })

        const updatedUser = await updateUserService(password, email, username, uuid, response)

        return response.status(200).json(updatedUser)
    }catch(errors){
        return response.status(400).json({error: Helper.organizationErrors("errors")})
    }

}

const updateUserForAdminController = async (request, response) => {
    const { professional_level, kind_of_work } = request.body

    const {user_uuid} = request.params

    const userExists = await User.findByPk(user_uuid)

    if(!userExists){
        return response.status(404).json({error: "user does not exists"})
    }

    if(professional_level && !["estágio","júnior","pleno","sênior"].includes(professional_level)){
        return response.status(400).json({error: "professional_level must be one of these: estágio, júnior, pleno, sênior"})
    }

    if(kind_of_work && !["home office", "presencial", "hibrido"].includes(kind_of_work)){
        return response.status(400).json({error: "kind_of_work must be one of these: home office, presencial, hibrido"})
    }

    try{
        const updatedUser = await updateUserAdminService(professional_level, kind_of_work, user_uuid)

        return response.status(200).json(updatedUser)
    }catch(errors){
        return response.status(400).json({error: Helper.organizationErrors(errors)})
    }

}

export {updateUserController, updateUserForAdminController} 