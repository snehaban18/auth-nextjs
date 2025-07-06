import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserLogin } from "@/helpers/authDataTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;

        // cheeck if user already exists
        const user = await User.findOne({username});
        if (!user) {
            return NextResponse.json({
                error: "Username or password is invalid"
            }, {
                status: 400
            });
        }

        // verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                error: "Password is invalid"
            }, {
                status: 400
            });
        }

        // create token data and set it in cookie on client
        const tokenData: UserLogin = {
            id: user._id,
            username: user.username,
            password: user.password // TODO: This should not be part of token
        };
        const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        });
        response.cookies.set("token", token, {
            httpOnly:true,
            expires: new Date(Date.now() + 24*3600*1000)  // 1 day = 24*3600sec = 24*3600*1000ms
        })
        // console.log("Response: ", response);
        return response;
    }
    catch (error: any) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        });
    }
}