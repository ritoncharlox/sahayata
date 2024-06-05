import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Successfully connnected to mongoDB`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
};

export default connectDB;