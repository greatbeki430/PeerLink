import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  contact: { type: String, required: true }, // email or phone
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  role: { type: String, required: true },
});

export const OTP = mongoose.model("OTP", OTPSchema);
