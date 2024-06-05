const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const User = require("./db/users");
const userRoutes = require("./routes/user-route.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Going");
});

app.use(userRoutes);
async function connectDB() {
  mongoose.connect("mongodb://127.0.0.1:27017", { dbName: "UserCollections" });
}
connectDB().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
