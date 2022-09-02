
export default class Helper{
    static valideBody({method, body}, response, next){

        if(Object.values(body).length === 0 && method !== "GET"){
            return response.status(400).json({error: "body empty"})
        }
        return next()
    }

    static organizationErrors(erros){
        try{
            if(erros.errors.length > 0){
                
                return erros.errors.map(({message}) => message)
            }
        }catch(er){
            return erros
        }

    }
}