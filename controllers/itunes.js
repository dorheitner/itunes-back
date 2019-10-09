const axios = require("axios");
const _ = require("lodash");

const baseUrl = "https://itunes.apple.com";

// Get Track Details from Itunes API (Search by Value)
exports.getTrack = (req, res, next) => {
  let serachRequest = req.query.value;

  axios
    .get(encodeURI(`${baseUrl}/search?term=${serachRequest}&limit=25`))
    .then(response => {
      let results = response.data.results;
      return res.status(200).json({
        status: 200,
        message: "",
        results,
      });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// Get Track Details from Itunes API (Search by Track Id)
exports.getTrackByTrackId = (req, res, next) => {
  const trackId = req.body.trackId;

  axios
    .get(`${baseUrl}/lookup?id=${trackId}`)
    .then(response => {
      return res.status(200).json({
        status: 200,
        message: "",
        results: response.data.results,
      });
    })
    .catch(error => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

// Get Track Details from Itunes API (Search by Value) And Search For Results With Music Video
exports.getTrackVideo = (req, res, next) => {
  let artistName = req.body.artistName;
  let trackName = req.body.trackName;

  axios
    .get(
      encodeURI(
        `${baseUrl}/search?term=${artistName}${"+"}${trackName}&entity=musicVideo`
      )
    )
    .then(response => {
      return res.status(200).json({
        status: 200,
        message: "",
        results: {
          url: !_.isEmpty(response.data.results)
            ? response.data.results[0].previewUrl
            : null,
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
