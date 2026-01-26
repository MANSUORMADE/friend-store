import { Resend } from "resend"
import dotenv from 'dotenv'
dotenv.config()
const resend = new Resend(process.env.RESEND_API_KEY)
export const sendEmail = async (to, subject, html) => {
        const mailOptions = { from: process.env.EMAIL_USER, to, subject, html }; 
    await resend.emails.send(mailOptions);
};