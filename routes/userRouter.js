const Router = require('express')
const router = new Router()


router.get('/auth', (req, res) => {
    res.json({message: "User is working"})
})
router.post('/registration')
router.post('/login')


module.exports = router