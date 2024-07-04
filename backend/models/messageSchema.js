import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Char"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "last Name Must Contain At Least 3 Char"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [11, "Phone Number Must Contain Exact 11 Digits"],
        maxLength: [15, "Phone Number Must Contain too Longer"]
    },
    message:{
        type: String,
        required: true,
        minLength: [10, "Message Must Contain At Least 10 Char"],
    },
})

export const Message = mongoose.model("Message", messageSchema)