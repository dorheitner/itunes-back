const express = require("express");

const searchRequestsController = require("../controllers/searchRequests");
const router = express.Router();

// Get The Last Track Request from DB
router.get("/", searchRequestsController.getLastRequests);

// Save Search Request on DB
router.post("/save", searchRequestsController.addRequest);

module.exports = router;
