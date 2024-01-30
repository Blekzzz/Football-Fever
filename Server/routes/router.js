const express = require('express')
const cors = require('cors')
const { register, login, findUser, editUser, subscribeMembership, generateMidtransToken, unsubscribeMembership, googleLogin } = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { getNews, getNewsByTitle } = require('../controllers/NewsController')
const membershipAuthentication = require('../middlewares/membershipAuthentication')
const { getTable, getLatestTransfer, squadDetail, getMatchday } = require('../controllers/StandingsController')
const router = express()

router.use(cors())
router.post('/register', register)
router.post('/login', login)
router.post('/google-login', googleLogin)
router.get('/news', getNews)

router.use(authentication)

router.get('/profiles/:id', findUser)
router.put('/profiles', editUser)
router.post('/generate-midtrans-token', generateMidtransToken)
router.patch('/subscribe', subscribeMembership)

router.use(membershipAuthentication)

router.get('/table/:league', getTable)
router.get('/transfers/:league', getLatestTransfer)
router.get('/squad-detail/:league/:team', squadDetail)
router.get('/matchday/:league', getMatchday)
router.patch('/unsubscribe', unsubscribeMembership)

router.use(errorHandler)

module.exports = router