const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const auth = require("../middleware/auth");
const asyncHandler = require("express-async-handler");

//register-----------------------------------------------------

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    //validation
    //!req.body.name ||
    //test to check if he provide a user name or password or mail

    if (!req.body.password || !req.body.email) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //max 15 char
    if (req.body.name.length > 15) {
      return res.status(400).json({ msg: "Name length is 15 characters MAX" });
    }
    //user exists
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //hash password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          Lname: req.body.Lname,
          phone: req.body.phone,
          location: req.body.location,
          role: req.body.role,
        });
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => res.status(400).json(err));
      });
    });
  })
);

//login------------------------------------------------------

router.post("/login", asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  //!req.body.password ||
  //test to check if he provide a user name or password or mail
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //test if user exist
  if (!user) {
    return res.status(400).json({ msg: "User doesn't exist" });
  }

  //after we found the user we use compare to match the hash passwords
  bcrypt.compare(req.body.password, user.password, function (err, response) {
    if (!response) {
      return res.status(400).send({ msg: "Wrong Password" });
    } else {
      //jwt validations
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
      res.json({
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          date: user.date,
          Lname: user.Lname,
          phone: user.phone,
          location: user.location,
          role: user.role,
          image: req.body.image,
        },
      });
    }
  });
}));
//login end---------------------------------------------------------

//profile----------------------------------------------------

router.get("/profile", auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    date: user.date,
    Lname: user.Lname,
    phone: user.phone,
    location: user.location,
    role: user.role,
    image: user.image,
  });
}));
//profile end----------------------------------------------------

//delete user
router.delete("/:id",asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json(err));
}));

//valid token for protected routes

router.post("/tokenIsValid", asyncHandler(async (req, res) => {
  try {
    const token = req.header("auth-token");
    //if no token test
    if (!token) {
      return res.json("false");
    }
    ///test if the jwt come with user info
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json("false");
    }
    // no user
    const user = await User.findById(verified._id);
    if (!user) {
      return res.json("false");
    }
    //return true for test in front end
    return res.json(true);
  } catch {
    res.status(500).json({ msg: err.message });
  }
}));

//user list
router.get("/", asyncHandler(async(req, res) => {
  await User.find()
    .then((msgs) => res.json(msgs))
    .catch((err) => res.status(400).json(err));
}));
//update

router.get("/update/:id", asyncHandler(async(req, res) => {
  await User.findById(req.params.id)
    .then((msgs) => res.json(msgs))
    .catch((err) => res.json(err));
}));
router.delete("/update/:id", asyncHandler(async(req, res) => {}));

router.put("/update/:id", asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("User has been updated"))
    .catch((err) => res.status(400).json(err));
}));

router.post("/register/admin", asyncHandler(async(req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    Lname: req.body.Lname,
    phone: req.body.phone,
    location: req.body.location,
    role: req.body.role,
  });

  await newUser
    .save()
    .then((user) => res.json("New User Added"))
    .catch((err) => res.status(400).json(err));
}));

module.exports = router;
