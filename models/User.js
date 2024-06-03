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
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;