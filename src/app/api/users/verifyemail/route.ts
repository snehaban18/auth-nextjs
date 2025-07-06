import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })
        if (!user) {
            return NextResponse.json({
                error: "Invalid token or token expired"
            }, {
                status: 400
            });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        console.log("Validated User: ", user);

        return NextResponse.json({
            message: "Email verified successfully.",
            success: true,
            user
        }, {
            status: 200
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