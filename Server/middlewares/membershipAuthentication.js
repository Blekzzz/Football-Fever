const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function membershipAuthentication(req, res, next) {
    try {
        const user = await User.findOne({ where: { email: req.user.email }})
        if (!user) throw ({ name: "AuthenticationError" })

        if (!user.isMembership) throw ({ name: "NoMembership" })

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = membershipAuthentication