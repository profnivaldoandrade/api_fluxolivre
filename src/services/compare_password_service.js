const bcrypt = require('bcryptjs')

function comparePasswordService(password,passUser){
    let isPassword = bcrypt.compareSync(password,passUser)
    return isPassword
}
module.exports = comparePasswordService