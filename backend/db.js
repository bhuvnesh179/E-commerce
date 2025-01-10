const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to db");
    
})
.catch((error) => {
    console.log("error", error);
    
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

const productSchema = new mongoose.Schema({
    id: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Products = mongoose.model("Products", productSchema);

module.exports = {
    User,
    Admin,
    Products,
}
