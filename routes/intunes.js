const express = require("express");

const itunesController = require("../controllers/itunes");
const router = express.Router();

// Get Track Details from Itunes API (Search by Value)
router.get("/", itunesController.getTrack);

// Get Track Details from Itunes API (Search by Track Id)
router.post("/trackId", itunesController.getTrackByTrackId);

// Get Track Details from Itunes API (Search by Value) And Search For Results With Music Video
router.post("/video", itunesController.getTrackVideo);

module.exports = router;
