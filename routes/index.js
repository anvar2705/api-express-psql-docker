const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const movieRouter = require('./movieRouter')
const countryRouter = require('./countryRouter')
const commentRouter = require('./commentRouter')
const genreRouter = require('./genreRouter')

router.use('/user', userRouter)
router.use('/movie', movieRouter)
router.use('/country', countryRouter)
router.use('/genre', genreRouter)
router.use('/comment', commentRouter)

module.exports = router
