const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../model/User");

router.post("/register", (req, res) => {
  let { name, username, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Paroolid on erinevad.",
    });
  }

  User.findOne({
    username: username,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Selline kasutajanimi on juba kasutusel.",
      });
    }
  });

  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Selline e-mail on juba meie andmebaasis.",
      });
    }
  });

  let newUser = new User({
    name,
    username,
    password,
    email,
  });

  //Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        return res.status(201).json({
          success: true,
          msg: "Super. Uus kasutaja on loodud.",
        });
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "Kasutajanime ei leia.",
        success: false,
      });
    }
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          payload,
          key,
          {
            expiresIn: 604800,
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              user: user,
              token: `Bearer ${token}`,
              msg: "Super! Sisselogimine õnnestus!",
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Parool on vale.",
          success: false,
        });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

module.exports = router;
