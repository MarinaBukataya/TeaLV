const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/refresh_token', userController.refreshToken)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/info', auth, userController.getUser)
router.patch('/add_to_cart', auth, userController.addToCart)

module.exports = router