const resourceNotFound = (req, res) => {
  res.status(404).send({
    errors: [
      { message: `${req.path} resource not found` },
    ],
  })
}

const methodNotAllowed = (req, res) => {
  res.status(405).send({
    errors: [
      { message: `${req.method} method is not allowed for ${req.path} resource` },
    ],
  })
}

module.exports = {
  resourceNotFound,
  methodNotAllowed,
}
