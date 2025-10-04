// routes/urlRoutes.js
const express = require("express");
const { createShortUrl, getAllUrls,deleteUrl } = require("../controllers/urlController");

const router = express.Router();

router.post("/create", createShortUrl);
router.get("/list", getAllUrls);
router.delete("/:shortId", deleteUrl);

module.exports = router;
