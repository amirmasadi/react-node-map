const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
const marksRouts = require("./routes/marks");
const usersRouts = require("./routes/users");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(
    app.listen(port, () => {
      console.log(`connected to mongodb and listening to port ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).send("its working.");
});

app.use("/api/marks", marksRouts);
app.use("/api/users", usersRouts);
