const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) throw ({ name: "AuthenticationError" })

        const verified = verifyToken(access_token)
        if (!verified) throw ({ name: "AuthenticationError" })

        const validUser = await User.findByPk(verified.id)
        if (!validUser) throw ({ name: "AuthenticationError" })

        req.user = {
            id: validUser.id,
            email: validUser.email,
            membership: validUser.isMembership
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication