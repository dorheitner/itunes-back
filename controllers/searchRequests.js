const SearchRequest = require("../models/searchRequest");

// Get The Last Track Request from DB
exports.getLastRequests = (req, res, next) => {
  SearchRequest.getRequests()
    .then(results => {
      return res.status(200).json({
        message: "",
        data: {
          results: results,
        },
      });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// Save Search Request on DB
exports.addRequest = (req, res, next) => {
  const value = req.body.value;
  const createDdAt = Date.now();

  const searchRequest = new SearchRequest(value, createDdAt);
  searchRequest
    .save()
    .then(result => {
      return res.status(201).json({
        message: "",
        data: {
          id: searchRequest._id,
        },
      });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
