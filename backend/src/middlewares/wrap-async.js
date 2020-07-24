const wrapAsync = controller => (req, res, next) =>
  controller(req, res)
    .catch(next)

module.exports = wrapAsync
