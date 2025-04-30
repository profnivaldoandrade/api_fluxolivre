const db = require('../config/data')
const tableName = 'menu_options'
class Menu_Options {
    async create(menuOptions) {
        try {
            await db.table(tableName).insert(menuOptions)
            return { validated: true }

        } catch (error) {
            return { validated: false, message: error }
        }
    }
    async findAll(){
        try {
            // const options = await db.table(tableName).select('*')
            const options = await db.table(tableName)
                            .join('role_menu_permissions','menu_options.id','role_menu_permissions.menu_option_id')
                            .join('roles','role_menu_permissions.role_id','roles.id')
                            .select('menu_options.id', 'menu_options.name', 'menu_options.icon', 'menu_options.router')
                            .where('roles.id', '=', 2)
            return {validated: true, values: options}
            
        } catch (error) {
            return {validated: false, message: error}
        }
    }

// SELECT mo.id, mo.name, mo.icon, mo.router
// from menu_options mo
// INNER JOIN role_menu_permissions rmo ON (rmo.menu_option_id = mo.id)
// INNER JOIN roles ro ON (ro.id = rmo.role_id)
// where ro.id = 2;

}
module.exports = new Menu_Options()