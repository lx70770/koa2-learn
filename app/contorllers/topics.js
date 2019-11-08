const Topic = require('../models/topics')

class TopicCtl {
  async find(ctx) {
    let { pageSize = 10, pageNumber = 1 } = ctx.query
    pageSize = Math.max(Math.floor(ctx.query.pageSize * 1), 1)
    pageNumber = Math.max(ctx.query.pageNumber * 1, 1) - 1
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) })
      .limit(pageSize)
      .skip(pageSize * pageNumber)
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields
      .split(';')
      .filter(f => f)
      .map(f => ' +' + f)
      .join('')
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    if (!topic) {
      ctx.throw(404, '话题不存在')
    }
    ctx.body = topic
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    const topic = await new Topic(ctx.request.body).save()
    ctx.body = topic
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false }
    })
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = topic
  }
}

module.exports = new TopicCtl()
