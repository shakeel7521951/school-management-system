import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bmxadventure8@gmail.com", 
    pass: "yoieuzhfcraiccks", 
  },
  tls: {
    rejectUnauthorized: false,    
  },
  connectionTimeout: 10000,        
});

const SendMail = async (email, subject, html) => {
  try {
    const mailOptions = {
      from: `"Academy Team" <bmxadventure8@gmail.com>`,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Failed to send mail");
  }
};

export default SendMail;
