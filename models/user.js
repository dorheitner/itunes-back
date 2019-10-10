const mongodb = require('mongodb')
const getDb = require('../helpers/database').getDb

const ObjectId = mongodb.ObjectId

class User {
  constructor (name, password) {
    this.name = name
    this.password = password
  }

  save () {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }

  static checkIfExsist (name) {
    const db = getDb()
    return db
      .collection('users')
      .findOne({ name: name })
      .then(user => {
        return user
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById (userId) {
    const db = getDb()
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        return user
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = User
