const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const { redirectUrl } = require("./controllers/urlController");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api/url", urlRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV == "production"){
const buildPath = path.join(__dirname, "frontend", "build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});
}

app.get("/:shortId", redirectUrl);
// Connect DB and start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mogodb Connected Successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });


 