const { body } = require('express-validator')

exports.login = [body('name').isLength({ min: 5 })]

exports.signUp = [
  body('name').isLength({ min: 5 }),
  body('password').isLength({ min: 5 })
]
