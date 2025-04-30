const menu_options = require('../models/Menu_Options')
class menuOptionsController{
    async new(req,res){
        const { name, icon, display_order,router } = req.body
        const result = await menu_options.create({
            name,
            icon,
            display_order,
            router,
        })
        result.validated
        ? res.status(201).json({sucess: true, message: 'Incluido com Sucesso!!'})
        : res.status(500).json({sucess: false,message: result.message})
    }

    async listAll(req, res){
        let result = await menu_options.findAll()
        result.validated
        ? res.status(201).json({sucess: true, values: result.values })
        : res.status(500).json({sucess: false,message: result.message})
    }

}
module.exports = new menuOptionsController()