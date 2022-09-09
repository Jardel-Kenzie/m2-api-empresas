import Company from "../database/models/company.js";
import Department from "../database/models/department.js";
import Sector from "../database/models/sector.js";
import User from "../database/models/user.js";
import Helper from "../services/helper.js";

export default class AdminController{

    static async deleteUser(request, response){
        const { user_uuid } = request.params

        const user = await User.findByPk(user_uuid)
        
        if(!user){
            return response.status(404).json({error: "User not found"})
        }

        if(user.is_admin){
            return response.status(401).json({error: "Admin cannot be deleted"})
        }

        try{
            user.destroy()

            return response.status(204).json()
        }catch(error){
            return response.status(400).json({ error: Helper.organizationErrors(error)})
        }
        
    }

    static async getDepartments(request, response){
        const departments = await Department.findAll({
            include: [{
                model: Company,
                as: "companies"
            }],
            attributes: {exclude: ["company_uuid"]}
        })

        return response.status(200).json(departments)
    }

    static async getDepartmentsByCompany(request, response){
        const {company} = request.params

        const departments = await Department.findAll({
            where:{
                company_uuid: company
            },
            include: [{
                model: Company,
                as: "companies"
            }],
            attributes: {exclude: ["company_uuid"]}
        })

        return response.status(200).json(departments)
    }

    static async getOutOfWork(request, response){
 
        const users = await User.findAll({
            where:  {
                department_uuid: null,
                is_admin:false
            }, attributes: {
                exclude: ["password"]
            }
        })

        return response.status(200).json(users)
    }

    static async getSectors(request, response){
        const sectors = await Sector.findAll()

        return response.status(200).json(sectors)
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
            if(errors.name === "SequelizeForeignKeyConstraintError"){
                return response.status(400).json({error: "sector_uuid not found"})
            }
            
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }

    static async createDepartment(request, response){
        const {name, description, company_uuid} = request.body

        try {
            const createdDepartment = await Department.create({
                name,
                description,
                company_uuid
            })
            
            return response.status(201).json(createdDepartment)
    
        } catch(errors) {
            if(errors.name === "SequelizeForeignKeyConstraintError"){
                return response.status(400).json({error: "company_uuid not found"})
            }
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }

    static async createEngage(request, response){
        const {department_uuid, user_uuid} = request.body

        const user = await User.findByPk(user_uuid)

        if(!user){
            return response.status(404).json({error: "user not found"})
        }

        if(user.department_uuid){
            return response.status(400).json({error: "user alread department!"})
        }

        const department = await Department.findByPk(department_uuid)

        if(!department){
            return response.status(404).json({error: "department not found"})
        }

        try {
            user.update({
                department_uuid
            }, {attributes: {exclude: ['password']}})

            return response.status(200).json(user)
    
        } catch(errors) {
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }

    static async deleteDepartmentForUser(request, response){
        const {user_uuid} = request.params

        const user = await User.findByPk(user_uuid)

        if(!user){
            return response.status(404).json({error: "user not found"})
        }

        if(!user.department_uuid){
            return response.status(400).json({error: "user does not belong to any department"})
        }


        try {
            user.update({
                department_uuid: null
            }, {attributes: {exclude: ['password']}})

            return response.status(200).json(user)
    
        } catch(errors) {
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }
    }

    static async deleteDepartment(request, response){
        const {department} = request.params

        const depart = await Department.findByPk(department)

        if(!depart){
            return response.status(404).json({error: "department not found"})
        }

        try{
            depart.destroy()
            return response.status(204).json()
        }catch(errors){
            return response.status(400).json({ error: Helper.organizationErrors(errors)})
        }

    }

   

}