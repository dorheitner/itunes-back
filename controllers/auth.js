const User = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        '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'
    }
  })
)

const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res, next) => {
  try {
    const name = req.body.name
    const password = req.body.password

    const errors = validationResult(req)

    const checkEmailAddres = await User.checkIfExsist(name)

    if (!checkEmailAddres && errors.isEmpty()) {
      let hashedPw = await bcrypt.hash(password, 12)
      const createUser = new User(name, hashedPw)
      await createUser.save()

      console.log(createUser._id)

      if (createUser._id) {
        res.status(201).json({
          message: 'Account successfully created!',
          data: {
            id: createUser._id
          }
        })
      } else {
        const error = new Error('Failed to sgin up')
        error.statusCode = 404
        throw error
      }
    }
  } catch (e) {
    console.log(e)
    // if (!e.statusCode) {
    //   e.statusCode = 500
    // }
    // next(e)
  }
}

exports.login = async (req, res, next) => {
  const name = req.body.name
  const password = req.body.password

  console.log(password)
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    try {
      const user = await User.checkIfExsist(name)

      if (!_.isEmpty(user)) {
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
          await User.findById(user._id)
          token = jwt.sign(
            {
              name: user.name,
              userId: user._id
            },
            '6tKtiaw0dhBDZRTlJ4Ha',
            {
              expiresIn: '2h'
            }
          )

          res.status(200).json({
            message: 'Login to account successfully!',
            data: {
              user: {
                id: user._id,
                name: user.name
              },
              token: token
            }
          })
        }
      }
    } catch (e) {
      if (!e.statusCode) {
        e.statusCode = 500
      }
      next(e)
    }
  } else {
    const error = new Error('Invalid email or password')
    error.statusCode = 422
    error.data = errors.array()
    next(error)
  }
}

exports.logout = (req, res) => {
  res.status(200).json({
    message: 'Logout!',
    data: {}
  })
}
