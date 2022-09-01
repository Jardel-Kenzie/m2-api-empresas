
export default class Helper{
    static valideBody({body}, response, next){
        if(Object.values(body).length === 0){
            return response.status(400).json({error: "body empty"})
        }
        return next()
    }

    static organizationErrors(erros){
        return erros.map(err => err.message)
    }
}