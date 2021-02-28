const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../model/User')

//route POST api/users/register
//desc Register the User
//access Public

router.post ('/register', (req, res) =>{
    let {
        name, 
        username, 
        email, 
        password, 
        confirm_password
    } = req.body 
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Paroolid on erinevad."
        });
    }
    //check for the unique Username
    User.findOne({
        username: username
    }).then (user => {
        if (user) {
        return res.status(400).json({
            msg: "Selline kasutajanimi on juba kasutusel. Palun mõtle uus."
            });
        }
    });
     //check for the unique Email
    User.findOne({
        email: email
    }).then (user => {
        if (user) {
        return res.status(400).json({
            msg: "Sellise emailiga kasutaja on juba kasutusel."
            });
        }
    });
    // Then data is valid and we cant register new user
    let newUser = new User ({
        name,
        username,
        password,
        email,
    });

    //Hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash (newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(). then (user => {
            return res.status(201).json({
                success: true,
                msg: "Super. Uus kasutaja on loodud."
                });
            });
        });
    });
})

//route POST api/users/login
//desc Signing the User
//access Public

router.post('/login', (req, res) => {
    User.findOne ({
        username: req.body.username
    }) .then (user => {
        if (!user) {
        return res.status(404).json ({
            msg: "Kasutajanime ei leia.",
            success: false
        });
    }
    // If there is user, compare password
    bcrypt.compare(req.body.password, user.password). then (isMatch => {
        if (isMatch) {
            //users password is correct, we need to send the JSON Token for user
            const payload = {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            }
            jwt.sign (payload, key, {
                expiresIn: 604800 //aegub nädalaga
            }, (err, token) => {
                res.status(200).json ({
                    success: true,
                    user: user,
                    token: `Bearer ${token}`,
                    msg: "Super! Sisselogimine õnnestus!"
                });
            })
        } else {
            return res.status(404).json ({
                msg: "Parool on vale.",
                success: false,
            });
        }
    })
 });
});

//route GET api/users/profile
//desc return the user's data
//access Private

router.get ('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
})

module.exports = router;