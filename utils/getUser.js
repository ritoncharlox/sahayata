"use server"

import connectDB from "@/config/db";
import User from '@/models/User';

export async function getUserByEmail(email) {
  await connectDB();
  const user = await User.findOne({ email }).lean().exec();
  user._id = user._id.toString(); // Convert _id to string
  return user;
}