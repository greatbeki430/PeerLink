import mongoose from "mongoose";
const { Schema } = mongoose;

export const ROLES = ["Developer", "Project Manager", "Designer"];

const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
