import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:[6, "Password length should be greater than 6 character"]
    },
    reset: {
        code: {
            type: String,
            default: null
        },
        time: {
            type: String,
            default: null
        }
    }

},{collection: "users", timestamps: true})

const user = mongoose.model("user",userSchema)

export default user