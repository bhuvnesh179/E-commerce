const express = require('express');
const {Admin,Products} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware");


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

const productSchema = zod.object({
    id: zod.string(),
    name: zod.string(),
    price: zod.number(),
    description: zod.string(),
    category: zod.string(),
    image: zod.string()
});

router.post("/signup", async (req, res) => {
    try{
        const response = signupSchema.safeParse(req.body);

    if(!response.success){
        return res.status(400).json({
            message: "Invalid Inputs"
        })
    }

    const user = await Admin.findOne({
        email: req.body.email
    })

    if(user){
        return res.status(409).json({
            message: "Email already taken"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;

    const dbUser =  await Admin.create(req.body);

    const token = jwt.sign({userId: dbUser._id}, JWT_SECRET);

    res.json({
        message: "Admin created successfully",
        token: token
    })

    } catch(error){
        console.log(error);
        
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

    const user = await Admin.findOne({
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


router.post("/addProduct",authMiddleware, async(req, res) => {
    try{
        const response = productSchema.safeParse(req.body);
        if(!response.success){
            
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        console.log(req.body)
        const product = await Products.create(req.body);
        console.log(product)
        res.json({
            message: "Product added successfully",
            product: product
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.put("/updateProduct/:id", authMiddleware, async(req, res) => {
    try{
        const response = productSchema.safeParse(req.body);
        console.log(response);
        if(!response.success){
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }
        const product = await Products.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.json({
            message: "Product updated successfully",
            product: product
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

router.delete("/deleteProduct/:id", authMiddleware, async(req, res) => {
    try{
        const product = await Products.findOneAndDelete({id: req.params.id});
        console.log(product);
        
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })      
        }
        res.json({
            message: "Product deleted successfully",
            product: product
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

router.get("/products", authMiddleware, async(req, res) => {
    try{
        const products = await Products.find();
        res.json({
            products: products
        })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


module.exports = router;