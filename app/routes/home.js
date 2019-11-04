const Router = require('koa-router')
const router = new Router()
const { index } = require('../contorllers/home')

router.get('/', index)

module.exports = router
