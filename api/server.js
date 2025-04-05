const express = require("express");
const connectDB = require("./src/config/database");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

app.disable("x-powered-by");
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req.body

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("API is running!");
});

app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
