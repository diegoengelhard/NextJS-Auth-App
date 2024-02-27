import nodemailer from 'nodemailer';
import User from "../models/User.model";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                { 
                    verificationToken: hashedToken, 
                    verificationTokenExpires: Date.now() + 3600000 // 1 hour
                })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                { 
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpires: Date.now() + 3600000 // 1 hour
                })
        }

        // create reusable transporter object using the default SMTP transport
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "dfa12c1fc160dc",
                pass: "aa256cce86403f"
            }
        });


        // send mail with defined transport object
        const mailOptions = {
            from: 'auth@app.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `<a href="http://localhost:3000/verify-email?token=${hashedToken}&id=${userId}">Click here to verify your email</a>` : `<a href="http://localhost:3000/updatepassword?token=${hashedToken}&id=${userId}">Click here to reset your password</a>`
        }

        // send mail with defined transport object
        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}