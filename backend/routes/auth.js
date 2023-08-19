const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); //express validator for adding validation
const bcrypt = require('bcryptjs');
var fetchuser = require('../Middleware/fetchuser');

//json web token is used to verify user
const JWT_SECRET = 'zuhisagoodb$oy';
var jwt = require('jsonwebtoken');

// ROUTE:1 Create a user using: POST "/api/auth/createuser". No Login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;

    // console.log(req.body);
    // //    res.send("hello!")
    // const user = User(req.body);
    // user.save();   

    //if there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        //check whether the user with the same email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })
        const data = {
            user: {
                id: user.id

            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        // res.json(user)
        let success=true;
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


// ROUTE:2 Authenticate a user using: POST "/api/auth/login".
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ errors: "Please try to login with correct credential's" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success,errors: "Please try to login with correct credential's" });
        }

        const data = {
            user: {
                id: user.id

            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({ success,authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    // ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
    router.post('/getuser', fetchuser, async (req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


    

    module.exports = router