import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    externalAccounts: { type: [Object], required: false }, // Array of external accounts
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Export the User model
export default mongoose.models.User || mongoose.model("User", UserSchema);
