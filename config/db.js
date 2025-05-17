import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const DB_URI = 'mongodb://localhost:27017/UMS'
const connectDB = async () => {
    try {
       await mongoose.connect(DB_URI)
    } catch (error) {
        console.error('DB connection error', error);
    }
}

export default connectDB