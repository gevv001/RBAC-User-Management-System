import mongoose from "mongoose";
import { ROLE_PERMISSIONS } from "../utils/permissions.js";


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true
  },
  permissions: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ["invited", "active"],
    default: "invited"
  },
}, {timestamps: true});


userSchema.pre("save", function (next) {
  if (this.isNew && this.permissions.length === 0) {
    this.permissions = ROLE_PERMISSIONS[this.role] || [];
  }
  next();
});

const UserModel = mongoose.model("User", userSchema); 

export default UserModel
