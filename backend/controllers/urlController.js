// controllers/urlController.js
const validUrl = require("valid-url");
const Url = require("../models/Url");
const generateShortId = require("../utils/generateId");
require('dotenv').config();

exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl, customAlias } = req.body;

    // ✅ Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // ✅ Validate longUrl
    if (!longUrl || typeof longUrl !== "string") {
      return res.status(400).json({ message: "longUrl is required" });
    }

    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json({ message: "Invalid long URL" });
    }

    // ✅ Base URL for short links
    const baseUrl =
      process.env.BASE_URL ||
      `http://localhost:${process.env.PORT || 5000}`;

    // ✅ Handle custom alias
    if (customAlias) {
      const existsAlias = await Url.findOne({ shortId: customAlias });
      if (existsAlias) {
        return res.status(400).json({ message: "Custom alias already used" });
      }

      const newUrl = await Url.create({
        longUrl,
        shortId: customAlias,
        customAlias,
        user: req.user._id,
      });

      return res.status(201).json({
        success: true,
        shortUrl: `${baseUrl}/${newUrl.shortId}`,
        data: newUrl,
      });
    }

    // ✅ Prevent duplicate URLs for the same user
    const existingUrl = await Url.findOne({ longUrl, user: req.user._id });
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        shortUrl: `${baseUrl}/${existingUrl.shortId}`,
        data: existingUrl,
      });
    }

    // ✅ Generate unique shortId
    let shortId = generateShortId(6);
    let tries = 0;
    while (await Url.findOne({ shortId })) {
      shortId = generateShortId(6);
      tries++;
      if (tries > 10) break; // safety check
    }

    // ✅ Create the new URL document
    const newUrl = await Url.create({
      longUrl,
      shortId,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      shortUrl: `${baseUrl}/${shortId}`,
      data: newUrl,
    });
  } catch (err) {
    console.error("createShortUrl error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({user:req.user._id}).sort({ createdAt: -1 }).limit(200);
    return res.json({success:true, urls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete URL
exports.deleteUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOneAndDelete({ shortId });
    if (!url) return res.status(404).json({ message: "URL not found" });
    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

exports.redirectUrl=async(req , res) => {
  try {
      const { shortId } = req.params;
      const urlDoc = await Url.findOne({ shortId });
      if (!urlDoc) return res.status(404).send("Not found");
  
      urlDoc.clicks = (urlDoc.clicks || 0) + 1;
      urlDoc.lastClicked = new Date();
      await urlDoc.save();
  
      return res.redirect(urlDoc.longUrl);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
}
