import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: false,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        number: {
            type: String,
            required: false,
            unique: true,
        },
        location: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
            select: false
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
        isVerified: {
            type: Boolean,
            default: false
        },
        avatar: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;