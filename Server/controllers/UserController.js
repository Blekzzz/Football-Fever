const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')
const midtransClient = require('midtrans-client');

class UserController {
    static async register(req, res, next) {
        try {
            const { email, password, username } = req.body
            if (!email) throw ({ name: "NoEmail" })
            if (!password) throw ({ name: "NoPassword" })
            if (!username) throw ({ name: "NoUsername" })

            await User.create(req.body)

            res.status(201).json({ message: `Your account has been successfully registered` })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { password, email } = req.body
            if (!password) throw ({ name: "NoPassword" })
            if (!email) throw ({ name: "NoEmail" })

            const isUser = await User.findOne({ where: { email } })
            if (!isUser) throw ({ name: "InvalidLogin" })

            const isValid = comparePassword(password, isUser.password)
            if (!isValid) throw ({ name: "InvalidLogin" })

            const token = signToken({
                id: isUser.id,
                email: isUser.email,
                isMembership: isUser.isMembership
            })

            res.status(200).json({ access_token: token, message: "Login Successfull", id: isUser.id, membership: isUser.isMembership })
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const { email, name } = ticket.getPayload();

            let [user, created] = await User.findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    email: email,
                    password: String(Math.random()),
                    username: name,
                },
                hooks: false
            })

            const token = signToken({
                id: user.id,
                email: user.email,
                isMembership: user.isMembership
            })

            res.status(200).json({ access_token: token, id: user.id,  membership: user.isMembership })
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            const { id } = req.params

            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            })
            if (!user) throw ({ name: "NotFound" })

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async editUser(req, res, next) {
        try {
            const { username, about } = req.body
            const user = await User.findByPk(req.user.id)

            await User.update({
                username: username,
                about: about
            }, { where: { id: user.id } })

            res.status(200).json({ message: "Profile update has been successfully changed" })
        } catch (error) {
            next(error)
        }
    }

    static async subscribeMembership(req, res, next) {
        try {
            await User.update({
                isMembership: true
            }, { where: { id: req.user.id } })

            res.status(200).json({ message: "Thankyou! Membership has been applied" })
        } catch (error) {
            next(error)
        }
    }

    static async unsubscribeMembership(req, res, next) {
        try {
            await User.update({
                isMembership: false
            }, { where: { id: req.user.id } })

            res.status(200).json({ message: "Your Subscription has been canceled" })
        } catch (error) {
            next(error)
        }
    }

    static async generateMidtransToken(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id)
            if (user.isMembership) throw ({ name: "MembershipApplied" })

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(10000000 + Math.random() * 9000000),
                    "gross_amount": 249000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": user.email,
                    "username": user.username
                }
            }

            const midtransToken = await snap.createTransaction(parameter)
            res.status(200).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController