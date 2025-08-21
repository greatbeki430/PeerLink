import twilio from "twilio";
import { env } from "../config/env.js";

const client = twilio(env.TWILIO_SID, env.TWILIO_AUTH_TOKEN);

export async function sendSMS(to, code) {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${code}`,
      from: env.TWILIO_PHONE_NUMBER, // Twilio phone number
      to,
    });
    console.log("SMS sent:", message.sid);
  } catch (err) {
    console.error("Error sending SMS:", err);
    throw err;
  }
}
