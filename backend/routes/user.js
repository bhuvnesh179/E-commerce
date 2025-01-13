const express = require('express');
const {User,Products} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware");
const crypto = require('crypto');

const router = express.Router();

const signupSchema = zod.object({
    email : zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()

})

const signinSchema = zod.object({
    email : zod.string().email(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    try{
        const response = signupSchema.safeParse(req.body);

    if(!response.success){
        return res.status(400).json({
            message: "Invalid Inputs"
        })
    }

    const user = await User.findOne({
        email: req.body.email
    })

    if(user){
        return res.status(409).json({
            message: "Email already taken"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;

    const dbUser =  await User.create(req.body);

    const token = jwt.sign({userId: dbUser._id}, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        token: token
    })

    } catch(error){
        console.log(error)
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
    
})


router.post("/signin", async (req, res) => {
    try{
        const response = signinSchema.safeParse(req.body);
    
    if(!response.success){
        res.status(400).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        email: req.body.email
    });

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    if(user){
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        
        return res.json({
            token: token
        })
    }

    res.status(401).json({
        message: "Error while logging in"
    })

    } catch(error){
        console.log(error);
        
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
    
})

router.get("/products",authMiddleware, async (req, res) => {
    try{
        const products = await Products.find();
        if (!products) {
            return res.status(404).json({
                message: "No products found"
            });
        }
        res.json(products);
    } catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
});

router.post("/google-auth", async (req, res) => {
    console.log(req.body);

    try {
        const { email, firstName, lastName} = req.body;
        let user = await User.findOne({ email });
        
        if (!user) {
            user = await User.create({
                email,
                firstName,
                lastName,
                password: crypto.randomBytes(16).toString('hex')
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            message: "Google auth successful",
            token
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;