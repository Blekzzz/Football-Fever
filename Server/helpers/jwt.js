const jwt = require('jsonwebtoken')
const PRIVATE_KEY = process.env.JWT_SECRET

function signToken(data) {
    return jwt.sign(data, PRIVATE_KEY)
}

function verifyToken(token) {
    return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
    signToken,
    verifyToken
}