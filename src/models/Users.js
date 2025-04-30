//importar a conexao BD
const knex = require('../config/data')

class Users {

    //criar um metodo para buscar todos os usuarios do banco
    async findAll() {
        try {
            let users = await knex.select(["id", "name", "email","password"]).table('users')
            return { validated: true, values: users }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    //criar um metado para buscar um usuario especifico
    async findById(id) {
        try {
            let user = await knex.select(["id", "name", "email"]).where({ id: id }).table('users')
            return user.length > 0
                ? { validated: true, values: user }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async findByEmail(email) {
        try {
            let user = await knex.select(["id", "name", "email","password", "role_id"]).where({ email: email }).table('users')
            return user.length > 0
                ? { validated: true, values: user[0] }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async create(name, email, password,role) {
        try {
            await knex.insert({
                name: name, email: email, password: password, role_id:role
            })
                .table('users')
            return { validated: true }
        } catch (error) {
            return { validated: false, error: error }
        }
    }
}

module.exports = new Users()