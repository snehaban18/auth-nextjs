import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { EMAIL_TYPES } from "@/helpers/authDataTypes";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        let emailSubject = "";
        let emailHtml = ""
        const href = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
        const browserMsg = `Or you can paste the following link in your browser: <br />${href}`;

        if (emailType === EMAIL_TYPES.VERIFY_EMAIL) {
            emailSubject = "MailTrap email verification";
            emailHtml = `<p>Click <a href="${href}">here</a> to verify your email.</p>${browserMsg}`;
            
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 24*3600*1000 // 1 day in ms
            });
        }
        // reset password
        else {
            emailSubject = "MailTrap password reset";
            emailHtml = `<p>Click <a href="${href}">here</a> to reset your password.</p>${browserMsg}`;
            
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600*1000 // 1 hr in ms
            });
        }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: emailSubject,
            html: emailHtml
        }

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERID,
              pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const response = await transport.sendMail(mailOptions);
        console.log(response);
    }
    catch (error: any) {
        throw new Error(error.message);
    }
};

