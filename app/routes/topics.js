const Router = require('koa-router')
const jwt = require('koa-jwt')
const { find, findById, create, update } = require('../contorllers/topics')
const { secret } = require('../config')

// 可以增加prefix前缀
const router = new Router({ prefix: '/topics' })

const auth = jwt({ secret })

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', findById)
router.patch('/:id', auth, update)

module.exports = router
