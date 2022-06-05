const router = require("express").Router();
const User = require("./../models/user");
const bcrypt = require("bcrypt");

//regiser
router.post("/register", async (req, res) => {
  //hash the password
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    });
    //save the user
    const user = await newUser.save();
    res.status(200).json({ message: "user created.", data: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

//login
router.post("/login", async (req, res) => {
  //find the user base on user name
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    //compare the enter pass with the hashed one in the DB
    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    isPassValid
      ? res.status(200).json({ message: "welcome", data: user._id })
      : res.status(404).json({ message: "wrong username or password" });
  } else {
    res.status(404).json({ message: "wrong username or password" });
  }
});

module.exports = router;
