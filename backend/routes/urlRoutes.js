// routes/urlRoutes.js
const express = require("express");
const { createShortUrl, getAllUrls,deleteUrl} = require("../controllers/urlController");
const auth =require("../middlewares/auth")

const router = express.Router();

router.post("/create",auth, createShortUrl);
router.get("/list",auth, getAllUrls);
router.delete("/:shortId",auth, deleteUrl);

module.exports = router;
