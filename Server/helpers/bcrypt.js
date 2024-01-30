const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(8)

function hashPassword(password) {
    return bcrypt.hashSync(password, salt)
}

function comparePassword(inputPassword, dbPassword) {
    return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}