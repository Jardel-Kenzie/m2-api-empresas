import User from "../models/user.js"

const populateUsers = async () => {
    return await User.bulkCreate([
        {
            username: "ADMIN",
            email: "admin@mail.com",
            password: "admin",
            professional_level: "junior",
            kind_of_work: "home office",
            is_admin: true
        },
        {
            username: "Felipe",
            email: "felipe@mail.com",
            password: "1234",
            professional_level: "junior",
            kind_of_work: "home office",
            is_admin: false
        },
        {
            username: "Ruan",
            email: "ruan@mail.com",
            password: "1234",
            professional_level: "junior",
            kind_of_work: "home office",
            is_admin: false
        },
        {
            username: "Jorge",
            email: "jorge@mail.com",
            password: "1234",
            professional_level: "senior",
            kind_of_work: "home office",
            is_admin: false
        },
        {
            username: "João",
            email: "joao@mail.com",
            password: "1234",
            professional_level: "pleno",
            kind_of_work: "home office",
            is_admin: false
        },
        {
            username: "Bruna",
            email: "bruna@mail.com",
            password: "1234",
            professional_level: "senior",
            kind_of_work: "home office",
            is_admin: false
        },
        {
            username: "Ricardo",
            email: "ricardo@mail.com",
            password: "1234",
            professional_level: "estagiario",
            kind_of_work: "presencial",
            is_admin: false
        },
        {
            username: "Joana",
            email: "joana@mail.com",
            password: "1234",
            professional_level: "junior",
            kind_of_work: "hibrido",
            is_admin: false
        },
    ])
}

export default populateUsers