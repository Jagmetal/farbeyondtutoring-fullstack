require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors');
const validateJwt = require("./middleware/jwtMiddleware");

const app = express();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use(validateJwt);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to myMongoDB application." });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;