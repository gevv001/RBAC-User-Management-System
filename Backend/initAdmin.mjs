import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "./models/userModel.js";
import { ROLE_PERMISSIONS, ROLES } from "./utils/permissions.js";

dotenv.config(); // Load .env

const createInitialAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ums", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const existingAdmin = await UserModel.findOne({ email: "" });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const newAdmin = new UserModel({
      fullName: "System Admin",
      email: "",
      password: hashedPassword,
      role: ROLES.ADMIN,
      permissions: ROLE_PERMISSIONS[ROLES.ADMIN],
      status: "active"
    });

    await newAdmin.save();
    console.log("✅ Admin user created successfully.");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createInitialAdmin();
