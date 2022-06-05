const router = require("express").Router();
const Pin = require("./../models/pin");

//add marks(pins) to database
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    await newPin.save();
    res.status(200).json(newPin);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

//get all marks(pins) from database
router.get("/", async (req, res) => {
  try {
    const allMarks = await Pin.find();
    res.status(200).json(allMarks);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

module.exports = router;
