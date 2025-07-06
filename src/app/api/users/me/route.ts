import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function GET (request: NextRequest) {
    try {
        const userId = await getTokenData(request);
        const user = await User.findById(userId)
                    .select("-password -isAdmin -isVerified"); // don't fetch password
        return NextResponse.json({
            message: "User found",
            user,
            success: true
        });
    }
    catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    }
}