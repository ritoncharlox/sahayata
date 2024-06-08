import mongoose from "mongoose";

const connectDB = async () => {
  try {

    if (mongoose.connections && mongoose.connections[0].readyState) {
      // console.log("Database already connected");
      return;
    }

    const connection = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: "Sahayata"
      }
    )

    console.log(`Successfully connnected to mongoDB, Database : ${connection.connection.host}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
};

export default connectDB;