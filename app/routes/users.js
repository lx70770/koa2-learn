const Router = require('koa-router')
const { index } = require('../contorllers/users')

// 可以增加prefix前缀

const router = new Router({ prefix: '/users' })

router.get('/', index)

module.exports = router
