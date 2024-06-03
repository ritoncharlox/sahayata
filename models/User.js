import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        number: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        dateJoined: {
            type: Date,
            required: true,
        },
        isUser : {
            type: Boolean,
            default: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isFreelancer: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;