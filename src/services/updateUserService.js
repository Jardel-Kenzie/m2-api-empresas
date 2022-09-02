import User from "../database/models/user.js"
import pkgBcrypt from 'bcryptjs'
const { hash } = pkgBcrypt;


const updateUserService = async (password, email, username, uuid, response) => {
    try{
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
        
    } catch(errors) {
        return response.status(400).json({ error: Helper.organizationErrors(errors)})
    }
}

export default updateUserService