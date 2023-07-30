const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const authorRouter = require('./authorRouter')
const booksRouter = require('./booksRouter')

router.use('/user', userRouter)
router.use('/books', booksRouter)
router.use('/author', authorRouter)

module.exports = router