class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>这是home页</h1>'
  }
}

module.exports = new HomeCtl()
