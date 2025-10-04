// models/Url.js
const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  customAlias: { type: String },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date }
});

module.exports = mongoose.model('Url', UrlSchema);
