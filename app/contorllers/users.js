class UserCtl {
  index(ctx) {
    ctx.body = '<h1>这是user页</h1>'
  }
}

module.exports = new UserCtl()
