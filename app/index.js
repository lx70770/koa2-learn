const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error') // 强大的错误处理
const parameter = require('koa-parameter') // 全局的参数校验
const mongoose = require('mongoose')
const app = new Koa()
const routing = require('./routes')
const { connectingStr } = require('./config')

mongoose.connect(
  connectingStr,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log('mongoodb连接成功了')
)
mongoose.connection.on('error', console.error)

// 全局错误处理
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
)
app.use(bodyParser())
app.use(parameter(app))
routing(app)

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('staring at 3000 port'))
