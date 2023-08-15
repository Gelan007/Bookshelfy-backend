const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')

router.get('/', authorController.getAll)
router.post('/', authorController.create)


module.exports = router