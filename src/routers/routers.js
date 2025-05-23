//requerer express
const express = require('express')
//utilizar o metodo de rotas do express
const router = express.Router()
//requerer o metodo listar todos
const usersControllers = require('../controllers/usersControllers') 
const authUserMiddleware = require('../middleware/auth_user_milddleware')
const menuOptionsController = require('../controllers/menuOptionsController')

//rota url 
//rota de listar os usuarios
router.get('/users',usersControllers.listAll)
//rota de listar um unico usuario
router.get('/user/:id',usersControllers.listOne)
router.post('/user', usersControllers.new)
router.post('/login',usersControllers.login)
router.post('/option',menuOptionsController.new)
router.get('/options', menuOptionsController.listAll)

module.exports = router