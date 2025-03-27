const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Database/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const app = express();

// Import Routes
const UserRoutes = require("./Routes/UserRoute.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/userData', UserRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); 