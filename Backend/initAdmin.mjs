import User from "./models/userModel.js";
import bcrypt from "bcrypt";
import fs from "fs";

export async function seedAdmin() {
  if (process.env.SEED_ADMIN !== "true") return;

  const flagFile = "./admin-seeded.flag";
  if (fs.existsSync(flagFile)) {
    console.log("✅ Admin already seeded (flag file exists)");
    return;
  }

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("⚠️ Admin user already exists.");
    fs.writeFileSync(flagFile, "seeded");
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await User.create({
    fullName: process.env.ADMIN_FULLNAME,
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
    status: "active"
  });

  fs.writeFileSync(flagFile, "seeded");

  console.log("✅ Admin user created:", process.env.ADMIN_EMAIL);
}
