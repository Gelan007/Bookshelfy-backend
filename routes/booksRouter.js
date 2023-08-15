const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')

router.get('/', booksController.getAll)
router.get('/:id', booksController.getById)
router.post('/', booksController.create)


module.exports = router