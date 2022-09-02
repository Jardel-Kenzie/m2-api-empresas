import updateUserService from '../services/updateUserService.js'
import pkgJwt from 'jsonwebtoken'

const { verify } = pkgJwt

const updateUserController = async (request, response) => {
    const { password, email, username } = request.body

    const [, token] = request.headers.authorization.split(" ")

    const uuid = verify(token, "kenzie", (_, decoded) => {
        return decoded.uuid
    })

    const updatedUser = await updateUserService(password, email, username, uuid, response)

    return response.json(updatedUser)

}

export default updateUserController