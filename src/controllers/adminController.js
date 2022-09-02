import Company from "../database/models/company.js";
import Department from "../database/models/department.js";
import User from "../database/models/user.js";

export default class AdminController{
    static async getDepartments(request, response){
        const departments = await Department.findAll()

        return response.status(200).json(departments)
    }

    static async getOutOfWork(request, response){
        console.log("iue")
        const users = await User.findAll({
            where:  {
                department_uuid: null,
                is_admin:false
            }
        })

        return response.status(200).json(users)
    }


    static async createCompany(request, response){

        const {name, opening_hours, description, sector_uuid} = request.body

        try {
            const createdCompany = await Company.create({
                name,
                opening_hours,
                description,
                sector_uuid
            })
            
            return response.status(201).json(createdCompany)
    
        } catch(errors) {
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }


}