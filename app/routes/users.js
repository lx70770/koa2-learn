const Router = require('koa-router')
const jwt = require('koa-jwt')
const {
  find,
  findById,
  create,
  update,
  remove,
  login,
  checkOwner, // 中间件 检查是不是当前用户
  listFollowing,
  listFollowers,
  follow,
  unfollow,
  checkUserExist
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
router.get('/:id/follower', listFollowers)
router.get('/:id/following', listFollowing)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/unfollow/:id', auth, checkUserExist, unfollow)

module.exports = router
