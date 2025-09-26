import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "shakeel7521951@gmail.com",
        pass: "irfm pzgh kebw uvfg"
    },
    secure: true,
    timeout: 10000
});

const SendMail = async (email, subject, text) => {
    try {
        const mailOptions = {
            from: 'shakeeldev.tech@gmail.com',
            to: email,
            subject: subject,
            html: text
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        throw new Error("Failed to send mail");
    }
};

export default SendMail;
