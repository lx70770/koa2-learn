const Router = require('koa-router')
const jwt = require('koa-jwt')
const {
  find,
  findById,
  create,
  update,
  remove,
  login,
  checkOwner
} = require('../contorllers/users')
const { secret } = require('../config')

// 可以增加prefix前缀
const router = new Router({ prefix: '/users' })

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, remove)
router.post('/login', login)

module.exports = router
