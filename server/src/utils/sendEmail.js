import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export async function sendEmail(to, code) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use Mailtrap in dev
      auth: {
        user: env.EMAIL_USER, // your email
        pass: env.EMAIL_PASS, // app password or real password
      },
    });

    const info = await transporter.sendMail({
      from: `"WebRTC App" <${env.EMAIL_USER}>`,
      to,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
