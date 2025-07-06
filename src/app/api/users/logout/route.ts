import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true
        });
        response.cookies.set("token", "", {
            httpOnly:true
        })
        console.log("Response: ", response);
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