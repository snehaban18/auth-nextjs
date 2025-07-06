import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { EMAIL_TYPES, UserSignup } from "@/helpers/authDataTypes";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, username, password} = reqBody;

        // cheeck if user already exists
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({
                error: "User already exists"
            }, {
                status: 400
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: UserSignup = {
            username, email, password: hashedPassword
        };
        const savedUser = await new User(newUser).save();
        console.log("Saved: ", savedUser);

        // send verification email
        await sendEmail({
            email, 
            emailType: EMAIL_TYPES.VERIFY_EMAIL, 
            userId: savedUser._id
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    }
    catch (error: any) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        });
    }
}