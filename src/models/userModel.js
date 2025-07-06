import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,  
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String, 
    forgotPasswordTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model("User", UserSchema); // use existing or create new

export default User;