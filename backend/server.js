// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api/url", urlRoutes);

// Redirect route (short link)
const Url = require("./models/Url");
app.get("/:shortId", async (req, res) => {
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
});

// Connect DB and start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });
