class Required {
  static create(req, res, next) {
    const { body } = req
    if (!body.expireAfter || !body.secret || !body.expireAfterViews) {
      return res.status(400).json({
        msg: 'missing required fields',
        required: ['expireAfter', 'secret', 'expireAfterViews']
      })
    }
    next()
  }

  static retrieve(req, res, next) {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        msg: 'missing required param'
      })
    }
    next()
  }
}

module.exports = Required
