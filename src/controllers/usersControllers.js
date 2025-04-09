require('dotenv').config()
const users = require('../models/Users')
const passHash = require('../services/hash_password_service')
const passCompare = require('../services/compare_password_service')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const comparePasswordService = require('../services/compare_password_service')

class UsersControllers {
    async listAll(req, res) {
        let result = await users.findAll()
        !result.validated
            ? res.status(404).json({ sucess: false, message: result.error })
            : res.status(200).json({ sucess: true, values: result.values })
    }

    async listOne(req, res) {

        if (isNaN(req.params.id)) {
            res.status(400).json({ sucess: false, message: "ID Inválido!" })
        } else {
            let result = await users.findById(req.params.id)
            if (!result.validated) {
                res.status(404).json({ sucess: false, message: result.error })
            } else {
                result.values == undefined
                    ? res.status(406).json({ sucess: false, message: "Usuário não Encontrado!" })
                    : res.status(200).json({ sucess: true, values: result.values })
            }

        }
    }
    async new(req, res) {
        let { name, email, password} = req.body
        let role = 0
        let result = await users.create(name,email ,passHash(password),role)
        result.validated
            ? res.status(201).json({ sucess: true, message: "Usuário Cadastrado com Sucesso !" })
            : res.status(404).json({ sucess: false, message: result.error })
    }

    async login(req,res){
        let {email,password} = req.body
        let user = await Users.findByEmail(email)
        if(!user.validated){
            res.status(404).json({sucess: false, message: user.error})
        }else{
            if (user.values == undefined){
                res.status(406).json({sucess: false, message: 'E-mail não encontrado'})
            }else{
                let passValiated = comparePasswordService(password, user.values.password)
                if(!passValiated){
                    res.status(406).json({sucess: false, message: 'Senha Invalida'})
                }else{
                    let token = jwt.sign({email: user.values.email, role: user.values.role}, process.env.SECRET, {expiresIn: 1000 })
                    res.status(200).json({sucess: true, token: token, perfil: user.values.role})
                }
            }
        }    
    }
}

module.exports = new UsersControllers()