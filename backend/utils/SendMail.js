import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bmxadventure8@gmail.com",
    pass: "yoie uzhf crai ccks",
  },
  secure: true,
  timeout: 10000,
});

const SendMail = async (email, subject, text) => {
  try {
    const mailOptions = {
      from: "bmxadventure8@gmail.com", 
      to: email, 
      subject: subject,
      html: text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send mail");
  }
};

export default SendMail;
