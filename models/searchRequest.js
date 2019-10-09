const getDb = require("../helpers/database").getDb;

class SearchRequest {
  constructor(value, createdAt) {
    this.value = value;
    this.createdAt = createdAt;
  }

  // Save Search Request on DB
  save() {
    const db = getDb();
    return db
      .collection("searchRequests")
      .insertOne(this)
      .then(result => {
        return result;
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  }

  // Get The Last Track Request from DB
  static getRequests() {
    const db = getDb();
    return db
      .collection("searchRequests")
      .find({}, { sort: { createdAt: -1 } })
      .limit(10)
      .toArray()

      .then(result => {
        return result;
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  }
}

module.exports = SearchRequest;
